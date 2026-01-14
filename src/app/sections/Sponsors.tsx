"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sponsors Section - Suitcase Scroll Animation
 *
 * 3-PHASE ANIMATION:
 * ==================
 * Phase 1 (0% - 25%):   Zoom in until suitcase takes up ~80% of viewport
 * Phase 2 (25% - 75%):  Pan/scroll down along the suitcase to reveal sponsors (no more zooming)
 * Phase 3 (75% - 100%): Shrink back to original size
 *
 * The sponsors are positioned ON the suitcase image and scroll with it during Phase 2.
 */

// Sample sponsor data
const sponsors = [
  { name: "Sponsor 1", logo: "/logo.png", tier: "platinum" },
  { name: "Sponsor 2", logo: "/logo.png", tier: "platinum" },
  { name: "Sponsor 3", logo: "/logo.png", tier: "gold" },
  { name: "Sponsor 4", logo: "/logo.png", tier: "gold" },
  { name: "Sponsor 5", logo: "/logo.png", tier: "gold" },
  { name: "Sponsor 6", logo: "/logo.png", tier: "silver" },
  { name: "Sponsor 7", logo: "/logo.png", tier: "silver" },
  { name: "Sponsor 8", logo: "/logo.png", tier: "silver" },
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const suitcaseContainerRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinWrapperRef.current ||
        !suitcaseContainerRef.current ||
        !sponsorsRef.current
      ) {
        return;
      }

      // Create the main timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // 4x viewport heights of scrolling for smooth animation
          pin: pinWrapperRef.current,
          scrub: 3, // Higher value for ultra-smooth scrolling
          anticipatePin: 1,
          // markers: true, // Uncomment for debugging
        },
      });

      // ============================================
      // PHASE 1: Zoom in focusing on TOP of suitcase
      // Scroll progress: 0% - 20%
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          scale: 2.5,
          y: "25vh", // Start by showing top of suitcase
          duration: 0.2,
          ease: "power2.inOut",
        },
        0,
      );

      // Fade in ALL sponsors together (no stagger for smoothness)
      tl.to(
        sponsorsRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        0.15,
      );

      // ============================================
      // PHASE 2: Pan down along ENTIRE suitcase
      // Scroll progress: 20% - 70%
      // Linear movement for smooth scroll-like feel
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          y: "-70vh", // Pan all the way to bottom of suitcase
          duration: 0.5,
          ease: "none", // Linear for smooth, consistent panning
        },
        0.2,
      );

      // ============================================
      // PHASE 3: Hold at bottom briefly then fade sponsors
      // Scroll progress: 70% - 80%
      // ============================================
      tl.to(
        sponsorsRef.current,
        {
          opacity: 0,
          duration: 0.1,
          ease: "power2.in",
        },
        0.7,
      );

      // ============================================
      // PHASE 4: Zoom out - reverse of Phase 1
      // Scroll progress: 80% - 100%
      // Smooth transition back to original state
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.inOut", // Match Phase 1 easing for symmetry
        },
        0.8,
      );

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current) {
            st.kill();
          }
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full"
      style={{ height: "500vh" }} // Extra height for scroll distance
    >
      {/* Pin Wrapper - gets pinned during animation */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/*
          Suitcase Container - contains both the image and sponsors overlay
          This entire container scales and translates together
        */}
        <div
          ref={suitcaseContainerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: "center 30%", // Zoom focuses on upper portion of suitcase
            willChange: "transform",
          }}
        >
          {/* The suitcase image */}
          <div className="relative">
            <Image
              className="opacity-80"
              src="/sponsors-suitcase.webp"
              width={512}
              height={512}
              alt="Suitcase"
              priority
            />

            {/*
              Sponsors overlay - positioned ON the suitcase image
              This is positioned relative to the image so it scales and moves with it
            */}
            <div
              ref={sponsorsRef}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 py-12"
              style={{
                opacity: 0,
                willChange: "opacity",
              }}
            >
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-white drop-shadow-lg">
                Our Sponsors
              </h2>

              {/* Platinum Tier */}
              <div className="mb-4 w-full">
                <h3 className="text-sm font-semibold text-center mb-2 text-amber-300">
                  Platinum
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {sponsors
                    .filter((s) => s.tier === "platinum")
                    .map((sponsor, index) => (
                      <div
                        key={`platinum-${sponsor.name}`}
                        className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-xl"
                      >
                        <div className="relative w-12 h-12 md:w-16 md:h-16">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Gold Tier */}
              <div className="mb-4 w-full">
                <h3 className="text-xs font-semibold text-center mb-2 text-yellow-400">
                  Gold
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {sponsors
                    .filter((s) => s.tier === "gold")
                    .map((sponsor, index) => (
                      <div
                        key={`gold-${sponsor.name}`}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-lg"
                      >
                        <div className="relative w-10 h-10 md:w-12 md:h-12">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Silver Tier */}
              <div className="w-full">
                <h3 className="text-xs font-semibold text-center mb-2 text-gray-300">
                  Silver
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {sponsors
                    .filter((s) => s.tier === "silver")
                    .map((sponsor, index) => (
                      <div
                        key={`silver-${sponsor.name}`}
                        className="bg-white/70 backdrop-blur-sm rounded-md p-1.5 shadow-md"
                      >
                        <div className="relative w-8 h-8 md:w-10 md:h-10">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
