"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  latLngToVector3,
  MAKASSAR,
  sampleGreatCircle,
  TRADE_DESTINATIONS,
} from "@/lib/globeCoords";

const AUTO_ROTATE_SPEED = 0.0003;
const IDLE_RESUME_MS = 2000;
const EARTH_TEXTURE = "/textures/earth-dark.jpg";

function isMobileViewport(): boolean {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

function createProceduralEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.fillStyle = "#050d07";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const landPatches: Array<{ x: number; y: number; rx: number; ry: number }> = [
    { x: 420, y: 280, rx: 220, ry: 160 },
    { x: 980, y: 320, rx: 280, ry: 200 },
    { x: 1320, y: 360, rx: 180, ry: 140 },
    { x: 1560, y: 260, rx: 200, ry: 150 },
    { x: 300, y: 520, rx: 160, ry: 120 },
    { x: 760, y: 620, rx: 120, ry: 90 },
  ];

  for (const patch of landPatches) {
    const gradient = ctx.createRadialGradient(
      patch.x,
      patch.y,
      0,
      patch.x,
      patch.y,
      Math.max(patch.rx, patch.ry),
    );
    gradient.addColorStop(0, "rgba(96, 118, 98, 0.35)");
    gradient.addColorStop(1, "rgba(5, 13, 7, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(patch.x, patch.y, patch.rx, patch.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createAtmosphereMaterial(simple: boolean): THREE.ShaderMaterial {
  if (simple) {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(0xc8973e) },
        uIntensity: { value: 0.18 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormal;
        void main() {
          float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          gl_FragColor = vec4(uColor, rim * uIntensity);
        }
      `,
    });
  }

  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(0xc8973e) },
      uIntensity: { value: 0.28 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
        float pulse = 0.85 + 0.15 * sin(vNormal.y * 12.0);
        gl_FragColor = vec4(uColor, fresnel * uIntensity * pulse);
      }
    `,
  });
}

type RouteParticle = {
  arc: THREE.Vector3[];
  progress: number;
  speed: number;
};

type TradeRouteSystem = {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
  particles: RouteParticle[];
  positionAttr: THREE.BufferAttribute;
};

function createTradeRoutes(
  group: THREE.Group,
  mobile: boolean,
): TradeRouteSystem | null {
  if (mobile) return null;

  const origin = latLngToVector3(MAKASSAR.lat, MAKASSAR.lng, 1.01);
  const particles: RouteParticle[] = [];
  const positions: number[] = [];
  const particlesPerRoute = mobile ? 11 : 28;

  for (const destination of TRADE_DESTINATIONS) {
    const target = latLngToVector3(destination.lat, destination.lng, 1.01);
    const arc = sampleGreatCircle(origin, target, 48, 1.01);

    for (let i = 0; i < particlesPerRoute; i++) {
      const progress = i / particlesPerRoute;
      const index = Math.min(
        Math.floor(progress * (arc.length - 1)),
        arc.length - 1,
      );
      const point = arc[index];
      if (!point) continue;
      positions.push(point.x, point.y, point.z);
      particles.push({
        arc,
        progress,
        speed: 0.0015 + Math.random() * 0.0015,
      });
    }
  }

  const geometry = new THREE.BufferGeometry();
  const positionAttr = new THREE.Float32BufferAttribute(positions, 3);
  geometry.setAttribute("position", positionAttr);

  const material = new THREE.PointsMaterial({
    color: 0xc8973e,
    size: 0.018,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  group.add(points);

  return { geometry, material, points, particles, positionAttr };
}

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = isMobileViewport();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobile,
      powerPreference: mobile ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(
      mobile ? 1 : Math.min(window.devicePixelRatio, 2),
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphereSegments = mobile ? 32 : 64;
    const earthGeometry = new THREE.SphereGeometry(
      1,
      sphereSegments,
      sphereSegments,
    );
    let earthTexture: THREE.Texture = createProceduralEarthTexture();

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.92,
      metalness: 0.08,
    });

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      EARTH_TEXTURE,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const previous = earthMaterial.map;
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
        if (previous && previous !== texture) {
          previous.dispose();
        }
        earthTexture = texture;
      },
      undefined,
      () => {
        /* procedural fallback already applied */
      },
    );

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earth);

    const atmosphereGeometry = new THREE.SphereGeometry(
      1.04,
      sphereSegments,
      sphereSegments,
    );
    const atmosphereMaterial = createAtmosphereMaterial(mobile);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphere);

    const makassarPosition = latLngToVector3(
      MAKASSAR.lat,
      MAKASSAR.lng,
      1.02,
    );
    const highlightGeometry = new THREE.SphereGeometry(0.028, 16, 16);
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xc8973e,
      transparent: true,
      opacity: 0.95,
    });
    const makassarDot = new THREE.Mesh(highlightGeometry, highlightMaterial);
    makassarDot.position.copy(makassarPosition);
    globeGroup.add(makassarDot);

    const makassarGlow = new THREE.PointLight(0xc8973e, 2.8, 4.5);
    makassarGlow.position.copy(makassarPosition);
    globeGroup.add(makassarGlow);

    scene.add(new THREE.AmbientLight(0x607662, 0.28));
    const keyLight = new THREE.DirectionalLight(0xede8df, 0.35);
    keyLight.position.set(2, 1.5, 3);
    scene.add(keyLight);

    const tradeRoutes = createTradeRoutes(globeGroup, mobile);

    let autoRotate = !prefersReduced;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const targetCameraOffset = new THREE.Vector2(0, 0);
    const currentCameraOffset = new THREE.Vector2(0, 0);
    const baseCameraZ = 2.5;

    const pauseAutoRotate = () => {
      autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!prefersReduced) autoRotate = true;
      }, IDLE_RESUME_MS);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (mobile || prefersReduced) return;
      pauseAutoRotate();

      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetCameraOffset.set(x * 0.12, -y * 0.08);
    };

    const handlePointerDown = () => {
      pauseAutoRotate();
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);

    let frameId = 0;
    let elapsed = 0;

    const animate = () => {
      elapsed += 1;

      if (autoRotate && !prefersReduced) {
        globeGroup.rotation.y += AUTO_ROTATE_SPEED;
      }

      if (!mobile && !prefersReduced) {
        currentCameraOffset.lerp(targetCameraOffset, 0.06);
        camera.position.x = currentCameraOffset.x;
        camera.position.y = currentCameraOffset.y;
        camera.position.z = baseCameraZ;
        camera.lookAt(0, 0, 0);
      }

      if (tradeRoutes && !prefersReduced) {
        const { particles, positionAttr } = tradeRoutes;

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          if (!particle) continue;

          particle.progress = (particle.progress + particle.speed) % 1;

          const index = Math.min(
            Math.floor(particle.progress * (particle.arc.length - 1)),
            particle.arc.length - 1,
          );
          const point = particle.arc[index];
          if (!point) continue;
          positionAttr.setXYZ(i, point.x, point.y, point.z);
        }

        positionAttr.needsUpdate = true;
        tradeRoutes.material.opacity =
          0.55 + Math.sin(elapsed * 0.04) * 0.12;
      }

      if (!prefersReduced) {
        makassarGlow.intensity =
          2.4 + Math.sin(elapsed * 0.03) * 0.35 * (mobile ? 0.6 : 1);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      highlightGeometry.dispose();
      highlightMaterial.dispose();

      if (tradeRoutes) {
        tradeRoutes.geometry.dispose();
        tradeRoutes.material.dispose();
      }

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-none"
      aria-hidden="true"
    />
  );
}
