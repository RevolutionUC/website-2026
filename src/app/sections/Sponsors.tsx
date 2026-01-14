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
 * Phase 1 (0% - 30%):   Zoom in to suitcase
 * Phase 2 (30% - 70%):  Pan down along the suitcase
 * Phase 3 (70% - 100%): Zoom out back to original size
 */

export default function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const suitcaseContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinWrapperRef.current ||
        !suitcaseContainerRef.current
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
      // Scroll progress: 0% - 30%
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          scale: 2.5,
          y: "25vh", // Start by showing top of suitcase
          duration: 0.3,
          ease: "power2.inOut",
        },
        0,
      );

      // ============================================
      // PHASE 2: Pan down along ENTIRE suitcase
      // Scroll progress: 30% - 70%
      // Linear movement for smooth scroll-like feel
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          y: "-70vh", // Pan all the way to bottom of suitcase
          duration: 0.4,
          ease: "none", // Linear for smooth, consistent panning
        },
        0.3,
      );

      // ============================================
      // PHASE 3: Zoom out - reverse of Phase 1
      // Scroll progress: 70% - 100%
      // Smooth transition back to original state
      // ============================================
      tl.to(
        suitcaseContainerRef.current,
        {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut", // Match Phase 1 easing for symmetry
        },
        0.7,
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
        {/* Suitcase Container - scales and translates */}
        <div
          ref={suitcaseContainerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: "center 30%", // Zoom focuses on upper portion of suitcase
            willChange: "transform",
          }}
        >
          {/* The suitcase image */}
          <Image
            className="opacity-80"
            src="/sponsors-suitcase.webp"
            width={512}
            height={512}
            alt="Suitcase"
            priority
          />
        </div>
      </div>
    </section>
  );
}
