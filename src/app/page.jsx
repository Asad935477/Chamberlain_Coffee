"use client";
import "./index.css";
import { useRef, useState, useEffect } from "react";

import useCartStore from "@/store/useCartStore";
import InteractiveGradient from "@/components/InteractiveGradient/InteractiveGradient";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(CustomEase);

CustomEase.create("hop", ".15, 1, .25, 1");
CustomEase.create("hop2", ".9, 0, .1, 1");

let isInitialLoad = true;

export default function Home() {
  const router = useTransitionRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const container = useRef(null);
  const counterRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const navigateTo = (path) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (isCartOpen) {
      setTimeout(() => {
        router.push(path, {
          onTransitionReady: slideInOut,
        });
      }, 500);
    } else {
      router.push(path, {
        onTransitionReady: slideInOut,
      });
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const startLoader = () => {
    const counterElement =
      document.querySelector(".count p") || counterRef.current;
    const totalDuration = 2000;
    const totalSteps = 11;
    const timePerStep = totalDuration / totalSteps;

    if (counterElement) {
      counterElement.textContent = "0";
    }

    let currentStep = 0;
    function updateCounter() {
      currentStep++;
      if (currentStep <= totalSteps) {
        const progress = currentStep / totalSteps;
        let value;

        if (currentStep === totalSteps) {
          value = 100;
        } else {
          const exactValue = progress * 100;
          const minValue = Math.max(Math.floor(exactValue - 5), 1);
          const maxValue = Math.min(Math.floor(exactValue + 5), 99);
          value =
            Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        }
        if (counterElement) {
          counterElement.textContent = value;
        }
        if (currentStep < totalSteps) {
          setTimeout(updateCounter, timePerStep);
        }
      }
    }

    setTimeout(updateCounter, timePerStep);
  };

  useEffect(() => {
    if (showPreloader) {
      startLoader();

      gsap.set(".home-page-content", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(".nav", {
        opacity: 0,
      });
      const tl = gsap.timeline();

      tl.to(".count", {
        opacity: 0,
        delay: 2.5,
        duration: 0.25,
      });
      tl.to(".center-logo", {
        opacity: 100,
        duration: 4,
        ease: "hop2",
      });
      tl.fromTo(
        ".pre-loader",
        {
          opacity: 0,
          // scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 3,
          ease: "power4.out",
        }
      );
      tl.to(".home-page-content", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop2",
        delay: -1,
      });
      tl.to(".center-logo", {
        opacity: "0",
        ease: "hop2",
        delay: -1,
      });

      tl.to(".loader", {
        height: "0",
        ease: "hop2",
        duration: 0.5,
        delay: -1,
      });

      tl.to(".loader-bg", {
        height: "0",
        ease: "hop2",
        duration: 0.5,
        delay: -0.5,
      });
      tl.to(".nav", {
        opacity: 1,
      });

      tl.to(".loader-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop2",
        duration: 0.5,
      });
    } else {
      gsap.set(".home-page-content", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to("h1 span", {
        y: "0%",
        ease: "hop",
        duration: 1.5,
        stagger: 0.2,
        delay: showPreloader ? 10 : 1,
      });

      tl.to(
        ".product-preview-hero",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          stagger: 0.3,
        },
        "<"
      );
    },
    { scope: container, dependencies: [showPreloader] }
  );

  return (
    <div className="home-page" ref={container}>
      {showPreloader && (
        <>
          <div className="preloader-overlay">
            <div className="center-logo ">
              <img src="/brand_logo/logo_4.svg" alt="Center Logo" />
            </div>
            <div className="pre-loader">
              <div className="loader"></div>
              <div className="loader-bg"></div>
            </div>
            <div className="count">
              <p ref={counterRef}>0</p>
            </div>
            <div className="loader-2"></div>
          </div>

          <div className="preloader-bg-img">
            <img src="/hero.gif" alt="" />
          </div>
        </>
      )}

      <div className="home-page-content">
        <InteractiveGradient
          brushSize={25.0}
          brushStrength={0.5}
          distortionAmount={2.5}
          fluidDecay={0.98}
          trailLength={0.8}
          stopDecay={0.85}
          // color1="#662916" /* Mocha Brown */
          // color2="#8B4529" /* Espresso */
          // color3="#B67E57" /* Cinnamon Cocoa */
          // color4="#C5997E" /* Latte Cream */
          color1="#3B1F1B" /* Dark Cocoa */
          color2="#553024" /* Bitter Mocha */
          color3="#7B4A3A" /* Roasted Chestnut */
          color4="#A6785E" /* Burnt Caramel */
          colorIntensity={1.0}
          softness={1.0}
        />
        {/* <div>
          <img src="/brand_logo/logo_4.svg" className="hero-logo" alt="Logo" />
        </div> */}
        <div className="header">
          <h1 className="header-line-2">
            <span>CHAOS +</span>
          </h1>
          <h1 className="header-line-1">
            <span>CAFFEINE </span>
          </h1>
          <h1 className="header-line-2">
            <span>EQUALS TO</span>
          </h1>
          <h1 className="header-line-1">
            <span>CREATIVITY</span>
          </h1>
        </div>
        <div className="home-page-footer">
          <div className="hp-footer-col"></div>
          <div className="hp-footer-col">
            <h3>Click the image</h3>
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/mirror-orb-mockup`)}
            >
              <img src="/product_images/product_001.jpeg" alt="" />
            </div>
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/earbud-ad-mockup`)}
            >
              <img src="/product_images/product_002.jpeg" alt="" />
            </div>
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/minimal-phone-mockup`)}
            >
              <img src="/product_images/product_003.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
