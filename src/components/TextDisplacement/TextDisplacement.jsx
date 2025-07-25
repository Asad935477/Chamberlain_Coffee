//

"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

const DisplacementText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const animatedElementsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = text;

    // Step 1: Split into lines and animate with GSAP
    const split = new SplitType(container, {
      types: "lines",
      lineClass: "line",
    });

    // Wrap each line in a <span> for animation
    split.lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span>${content}</span>`;
    });

    const lineSpans = container.querySelectorAll(".line span");

    // Set up initial transform
    gsap.set(lineSpans, { y: "100%", display: "block" });

    const tl = gsap.timeline();

    // Animate lines in
    tl.to(lineSpans, {
      delay: 0.75,
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
      ease: "power3.out",
    });

    // Step 2: After GSAP completes, re-split to lines + words and activate displacement
    tl.call(() => {
      container.innerHTML = text;

      const splitFinal = new SplitType(container, {
        types: "lines",
        lineClass: "line",
      });

      // For each line, split into <span class="word">
      splitFinal.lines.forEach((line) => {
        const content = line.innerText;
        const words = content.split(/\s+/);
        const spanWrapper = document.createElement("span");

        words.forEach((word, i) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word";
          wordSpan.textContent = word;
          wordSpan.style.display = "inline-block";
          wordSpan.style.whiteSpace = "pre";
          spanWrapper.appendChild(wordSpan);
          if (i < words.length - 1) {
            spanWrapper.appendChild(document.createTextNode(" "));
          }
        });

        line.innerHTML = "";
        line.appendChild(spanWrapper);
      });

      // Cache word spans and their original positions
      const wordSpans = container.querySelectorAll(".word");
      animatedElementsRef.current = Array.from(wordSpans).map((span) => {
        const rect = span.getBoundingClientRect();
        return {
          element: span,
          originalX: rect.left + rect.width / 2,
          originalY: rect.top + rect.height / 2,
          currentX: 0,
          currentY: 0,
          targetX: 0,
          targetY: 0,
        };
      });

      const updateOriginalPositions = () => {
        animatedElementsRef.current.forEach((el) => {
          const rect = el.element.getBoundingClientRect();
          el.originalX = rect.left + rect.width / 2;
          el.originalY = rect.top + rect.height / 2;
        });
      };

      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 120;
        const maxDisplacement = 80;

        animatedElementsRef.current.forEach((el) => {
          const dx = el.originalX - mouseX;
          const dy = el.originalY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const force = (1 - distance / radius) * maxDisplacement;
            el.targetX = (dx / distance) * force;
            el.targetY = (dy / distance) * force;
          } else {
            el.targetX = 0;
            el.targetY = 0;
          }
        });
      };

      const animate = () => {
        const lerp = 0.1;
        animatedElementsRef.current.forEach((el) => {
          el.currentX += (el.targetX - el.currentX) * lerp;
          el.currentY += (el.targetY - el.currentY) * lerp;
          el.element.style.transform = `translate(${el.currentX}px, ${el.currentY}px)`;
        });
        requestAnimationFrame(animate);
      };

      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", updateOriginalPositions);
      setTimeout(updateOriginalPositions, 100);
      animate();

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", updateOriginalPositions);
      };
    });
  }, [text]);

  return (
    <p
      ref={containerRef}
      className={`displacement-text ${className}`}
      style={{ display: "block" }}
    >
      {text}
    </p>
  );
};

export default DisplacementText;
