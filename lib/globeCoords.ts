import * as THREE from "three";

export const MAKASSAR = { lat: -5.14, lng: 119.43 } as const;

export const TRADE_DESTINATIONS = [
  { name: "Japan", lat: 35.68, lng: 139.69 },
  { name: "China", lat: 31.23, lng: 121.47 },
  { name: "South Korea", lat: 37.57, lng: 126.98 },
  { name: "India", lat: 19.08, lng: 72.88 },
  { name: "UAE", lat: 25.2, lng: 55.27 },
  { name: "Netherlands", lat: 52.37, lng: 4.9 },
] as const;

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function sampleGreatCircle(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments: number,
  radius: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const a = start.clone().normalize();
  const b = end.clone().normalize();
  const angle = a.angleTo(b);

  if (angle < 0.0001) {
    return [start.clone()];
  }

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const sinAngle = Math.sin(angle);
    const w1 = Math.sin((1 - t) * angle) / sinAngle;
    const w2 = Math.sin(t * angle) / sinAngle;
    points.push(
      a
        .clone()
        .multiplyScalar(w1)
        .add(b.clone().multiplyScalar(w2))
        .normalize()
        .multiplyScalar(radius),
    );
  }

  return points;
}
