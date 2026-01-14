"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Sponsor data - customize as needed
const sponsors = [
  { tier: "Platinum", names: ["Sponsor 1", "Sponsor 2"] },
  { tier: "Gold", names: ["Sponsor 3", "Sponsor 4", "Sponsor 5"] },
  { tier: "Silver", names: ["Sponsor 6", "Sponsor 7", "Sponsor 8", "Sponsor 9"] },
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scaleLayerRef = useRef<HTMLDivElement>(null);
  const panLayerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinWrapperRef.current;
      const scaleLayer = scaleLayerRef.current;
      const panLayer = panLayerRef.current;
      const textOverlay = textOverlayRef.current;
      if (!section || !pin || !scaleLayer || !panLayer || !textOverlay) return;

      const ZOOM = 2.5; // Zoom level to fill ~80% of screen

      gsap.set([scaleLayer, panLayer], {
        force3D: true,
        willChange: "transform",
      });

      // Initially hide text overlay
      gsap.set(textOverlay, { opacity: 0, y: 50 });

      const getMetrics = () => {
        const img = panLayer.querySelector("img") as HTMLImageElement | null;
        const baseH = img?.offsetHeight ?? 0;
        const vh = window.innerHeight;

        const scaledH = baseH * ZOOM;
        // Limit pan distance to fit within the animation
        const panDistance = Math.min(scaledH * 0.4, vh * 0.5);

        const startY = vh * 0.05;
        const endY = -panDistance;

        return { vh, panDistance, startY, endY };
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const { vh } = getMetrics();
            // Keep animation within ~1.5 viewport heights
            return "+=" + vh * 1.5;
          },
          pin,
          scrub: 0.3,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      tl.addLabel("zoom", 0);
      tl.addLabel("overlayIn", 0.08);
      tl.addLabel("panStart", 0.15);
      tl.addLabel("overlayOut", 0.25);

      // Phase 1: 15% - Zoom in on suitcase
      tl.to(scaleLayer, { scale: ZOOM, duration: 0.15 }, 0);
      tl.to(panLayer, { y: () => getMetrics().startY, duration: 0.15 }, "zoom");

      // Phase 2: 7% - Fade in text overlay
      tl.to(textOverlay, { opacity: 1, y: 0, duration: 0.07 }, "overlayIn");

      // Phase 3: 25% - Pan down the suitcase with text
      tl.to(panLayer, { y: () => getMetrics().endY, duration: 0.25 }, "panStart");

      // Phase 4: 10% - Fade out text overlay (ends at 0.35)
      tl.to(textOverlay, { opacity: 0, y: -50, duration: 0.1 }, "overlayOut");

      // Phase 5: 15% - Zoom out back to original
      tl.to(scaleLayer, { scale: 1, duration: 0.15 }, 0.85);
      tl.to(panLayer, { y: 0, duration: 0.15 }, 0.85);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full min-h-screen"
    >
      <div ref={pinWrapperRef} className="relative w-full h-screen overflow-hidden">
        {/* Suitcase Layer */}
        <div
          ref={scaleLayerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: "50% 0%" }}
        >
          <div ref={panLayerRef} className="flex items-center justify-center">
            <Image
              className="opacity-90 select-none"
              src="/sponsors-suitcase.webp"
              width={600}
              height={600}
              alt="Suitcase"
              priority
              onLoadingComplete={() => ScrollTrigger.refresh()}
            />
          </div>
        </div>

        {/* Text Overlay - Sponsors Content */}
        <div
          ref={textOverlayRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="max-w-2xl mx-auto px-6 py-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl pointer-events-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Our Sponsors
            </h2>
            
            {sponsors.map((tierGroup) => (
              <div key={tierGroup.tier} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-600">
                  {tierGroup.tier}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {tierGroup.names.map((name) => (
                    <div
                      key={name}
                      className="px-6 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-center text-gray-500 mt-6 text-sm">
              Interested in sponsoring? Contact us!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
