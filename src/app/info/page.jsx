"use client";
import "./info.css";
import { useRef, useEffect } from "react";

import Footer from "@/components/Footer/Footer";
import DisplacementPlain from "@/components/Texture/shader";
import DisplacementText from "@/components/TextDisplacement/TextDisplacement";
import GridDistortion from "@/components/Texture1/shader";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useLenis } from "lenis/react";
import { posix } from "path";

const InfoPage = () => {
  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const displacementRef = useRef(null);

  useLenis(({ scroll }) => {});

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.set(".info-wrapper .revealer p", {
      y: "100%",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", delay: 0.85 } });

    tl.to(".info-col:nth-child(1) .revealer p", {
      y: "0%",
      duration: 0.75,
      stagger: 0.1,
    });

    tl.to(
      ".info-col:nth-child(2) .revealer p",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.1,
      },
      "0"
    );

    // Animate regular paragraphs
    if (descriptionRef.current) {
      const paragraphs = descriptionRef.current.querySelectorAll(
        "p:not(.displacement-text)"
      );

      paragraphs.forEach((p) => {
        const split = new SplitType(p, { types: "lines", lineClass: "line" });
        split.lines.forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
        });
      });

      const normalLines = descriptionRef.current.querySelectorAll(
        "p:not(.displacement-text) .line span"
      );

      gsap.set(normalLines, { y: "100%", display: "block" });

      tl.to(
        normalLines,
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        "-=1.6"
      );
    }

    // Animate DisplacementText
    if (displacementRef.current) {
      const split = new SplitType(displacementRef.current, {
        types: "lines",
        lineClass: "line",
      });

      split.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      const dispLines = displacementRef.current.querySelectorAll(".line span");

      gsap.set(dispLines, { y: "100%", display: "block" });

      tl.to(
        dispLines,
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        "-=1.5"
      );
    }
  }, []);

  return (
    <div className="info-page" ref={containerRef}>
      <div className="info-wrapper">
        <div className="info-col">
          <div className="info-item">
            <div className="shader-wrapper">
              <DisplacementPlain
                texture="/texture/Logo-Texture-1.png"
                shadowTexture="/texture/Logo-Texture-2.png"
                className="shader-inner"
              />
            </div>
            <div className="info-title">
              <div className="revealer">
                <p>Info</p>
              </div>
            </div>
            <div
              className="info-copy"
              id="info-description"
              ref={descriptionRef}
            >
              <DisplacementText
                text="Chamberlain Coffee is more than just your daily brew—it’s a carefully crafted experience designed for those who appreciate bold flavor, aesthetic simplicity, and sustainable choices. Our lineup includes everything from ethically sourced blends to functional accessories and playful merchandise—all curated to elevate the ritual of coffee drinking. Whether you're starting your morning with a cozy cup, designing your dream workspace, or creating content from your favorite café corner, Chamberlain Coffee brings thoughtful energy to every moment. Rooted in transparency and crafted with personality, it’s coffee that complements your lifestyle, not just fuels it. Would you like me to shape this for a landing page, product card, social caption, or press release? Happy to adapt it for different formats or vibes."
                splitBy="words"
                className="anime-text"
              />
              <DisplacementText
                text="Every roast we feature at Chamberlain Coffee is a deliberate choice—a reflection of our core commitment to transparency, taste, and experience. From the first harvest to the final pour, we work closely with trusted growers and craft-focused roasters to ensure each blend captures not just flavor, but feeling. We’re obsessed with the details—subtle notes, bold finishes, and that ineffable warmth that makes a great cup feel like home. Our merchandise, like our coffee, is designed to complement your lifestyle with intention and ease. Whether it’s a hand-thrown mug, a cozy hoodie, or sleek brewing gear, every piece fits seamlessly into your everyday rhythm."
                splitBy="words"
                className="anime-text"
              />
            </div>
          </div>
        </div>
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>What You Get</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Brewed Aesthetics</p>
              </div>
              <div className="revealer">
                <p>Creator Blends</p>
              </div>
              <div className="revealer">
                <p>Ready to Pour</p>
              </div>
              <div className="revealer">
                <p>Best Coffee Ever</p>
              </div>
            </div>
          </div>
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>Contact</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Creator Collaborations</p>
              </div>
              <div className="revealer">
                <p>instagram.com/chamberlaincoffee/</p>
              </div>
              <div className="revealer">
                <p>instagram.com/emmachamberlain/</p>
              </div>
              <br />
              <div className="revealer">
                <p>Customer Support</p>
              </div>
              <div className="revealer">
                <p>support@chamberlaincoffee.com</p>
              </div>
            </div>
            <div className="info-copy">
              <GridDistortion
                alt={"Emma Chamberlain"}
                className="influencer-image"
                imageSrc={`/influencer_images/Emma Chamberlain.jpg`}
                grid={100}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
