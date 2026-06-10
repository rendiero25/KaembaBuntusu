import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import Flip from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    Flip,
    useGSAP,
  );
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, useGSAP };
