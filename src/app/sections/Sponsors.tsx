"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sponsors
 *
 * A scroll-driven animation that zooms into the top half (lid) of the suitcase image.
 *
 * HOW THE ZOOM-INTO-LID ILLUSION WORKS:
 * =====================================
 * 1. The suitcase image is displayed at its initial size (512x512, similar to Sponsors.tsx)
 * 2. We use `transform-origin: center 25%` to anchor scaling near the top (lid area)
 * 3. As we scale up, the lid stays centered while the bottom (body/panda) scales out of view
 * 4. The blue lid fills the viewport, creating the illusion of zooming "into" it
 * 5. Sponsors fade in, appearing to be "inside" the suitcase lid
 *
 * The animation is fully reversible and scrubbed (tied to scroll position).
 */

// Sample sponsor data - replace with your actual sponsors
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
  // Refs for all animated elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const suitcaseRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const sponsorItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinWrapperRef.current ||
        !suitcaseRef.current ||
        !sponsorsRef.current
      ) {
        return;
      }

      // Create a GSAP timeline that's scrubbed to scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin starts when section top hits viewport top
          end: "+=250%", // Animation spans 2.5x viewport heights of scrolling
          pin: pinWrapperRef.current, // Pin the wrapper during animation
          scrub: 1, // Smooth scrubbing (1 = 1 second lag for smoothness)
          anticipatePin: 1, // Prevents jank when entering pinned state
          // markers: true, // Uncomment for debugging
        },
      });

      // ============================================
      // PHASE 1: Zoom into the lid (top half)
      // Scroll progress: 0% - 60%
      // ============================================

      // Scale up the suitcase dramatically
      // transform-origin is set to "center 25%" (lid area - top portion of image)
      // The lid is roughly the top 60% of the image based on the reference
      // As we scale, the bottom (panda and body) moves out of view
      tl.to(
        suitcaseRef.current,
        {
          scale: 6, // Scale factor to make lid fill viewport
          y: "30%", // Move down to keep lid centered as we zoom
          duration: 0.6,
          ease: "power1.inOut",
        },
        0,
      );

      // ============================================
      // PHASE 2: Sponsors appear inside the lid
      // Scroll progress: 60% - 100%
      // ============================================

      // Fade in the sponsors container
      tl.fromTo(
        sponsorsRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        0.5,
      );

      // Stagger in individual sponsor items
      tl.fromTo(
        sponsorItemsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.02, // Small stagger for wave effect
          ease: "back.out(1.7)",
        },
        0.55,
      );

      // Cleanup function
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

  // Helper to add refs to sponsor items array
  const addSponsorItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sponsorItemsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full"
      // The section needs enough height for ScrollTrigger to work
      // The actual pinned content will stay fixed while we scroll through this height
      style={{ height: "350vh" }}
    >
      {/*
        Pin Wrapper: This entire container gets pinned during the animation.
        It fills the viewport and contains all animated elements.
      */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/*
          SUITCASE: The suitcase image that zooms into its lid

          CRITICAL: transform-origin is set to "center 25%"
          This anchors the scaling to the lid area (top portion of the image)
          As we scale up:
          - The lid stays relatively centered in the viewport
          - The bottom (panda and suitcase body) scales out of view below
          - Combined with translateY, the lid fills the screen
        */}
        <div
          ref={suitcaseRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transformOrigin: "center 25%", // Anchor point for zoom (lid is in top portion)
            willChange: "transform",
          }}
        >
          <Image
            className="opacity-70"
            src="/sponsors-suitcase.webp"
            width={512}
            height={512}
            alt="Suitcase"
            loading="lazy"
          />
        </div>

        {/*
          SPONSORS CONTAINER: Appears "inside" the lid
          This works because by the time sponsors fade in,
          the scaled suitcase lid (blue area) is the full background
        */}
        <div
          ref={sponsorsRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: 0,
            willChange: "opacity",
          }}
        >
          <div className="w-full max-w-6xl mx-auto px-8 py-16">
            {/* Section Title */}
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white drop-shadow-lg">
              Our Sponsors
            </h2>

            {/* Platinum Tier */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-center mb-6 text-amber-300">
                Platinum
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {sponsors
                  .filter((s) => s.tier === "platinum")
                  .map((sponsor, index) => (
                    <div
                      key={`platinum-${sponsor.name}`}
                      ref={(el) => addSponsorItemRef(el, index)}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative w-32 h-32">
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
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-center mb-6 text-yellow-400">
                Gold
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {sponsors
                  .filter((s) => s.tier === "gold")
                  .map((sponsor, index) => (
                    <div
                      key={`gold-${sponsor.name}`}
                      ref={(el) =>
                        addSponsorItemRef(
                          el,
                          index +
                            sponsors.filter((s) => s.tier === "platinum")
                              .length,
                        )
                      }
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative w-24 h-24">
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
            <div>
              <h3 className="text-lg font-semibold text-center mb-6 text-gray-300">
                Silver
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {sponsors
                  .filter((s) => s.tier === "silver")
                  .map((sponsor, index) => (
                    <div
                      key={`silver-${sponsor.name}`}
                      ref={(el) =>
                        addSponsorItemRef(
                          el,
                          index +
                            sponsors.filter((s) => s.tier === "platinum")
                              .length +
                            sponsors.filter((s) => s.tier === "gold").length,
                        )
                      }
                      className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative w-16 h-16">
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
    </section>
  );
}
