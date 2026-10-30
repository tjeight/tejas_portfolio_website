"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollEffects() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        reveals.forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        const timelineLine = document.querySelector<HTMLElement>(
          "[data-timeline-line]",
        );
        const timeline = document.querySelector<HTMLElement>("[data-timeline]");

        if (timelineLine && timeline) {
          gsap.fromTo(
            timelineLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: timeline,
                start: "top 68%",
                end: "bottom 72%",
                scrub: 0.6,
              },
            },
          );
        }

        const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-parallax]");

        parallaxItems.forEach((element) => {
          const distance = Number(element.dataset.parallax ?? 36);

          gsap.fromTo(
            element,
            { y: distance },
            {
              y: -distance,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        media.revert();
      };
    },
    { scope },
  );

  return <div ref={scope} aria-hidden="true" className="contents" />;
}
