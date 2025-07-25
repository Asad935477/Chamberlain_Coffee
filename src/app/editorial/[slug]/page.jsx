"use client";
import "./article-detail.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

import articles from "@/articles";
import { findArticleBySlug, generateSlug } from "@/utils";
import useCartStore from "@/store/useCartStore";
import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useLenis } from "lenis/react";
import { useTransitionRouter } from "next-view-transitions";
import DisplacementText from "@/components/TextDisplacement/TextDisplacement";
import GridDistortion from "@/components/Texture1/shader";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = findArticleBySlug(articles, slug);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useTransitionRouter();
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  const containerRef = useRef(null);
  const descriptionRefs = useRef([]);
  const displacementRef = useRef(null);

  const bodyCopy = article?.bodyCopy || [];

  const lenis = useLenis(({ scroll }) => {});

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

  useGSAP(() => {
    if (!containerRef.current || !article) return;

    gsap.set(".article-meta .revealer p", {
      y: "100%",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        delay: 0.85,
      },
    });

    tl.to(".article-meta .revealer p", {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
    });

    tl.fromTo(
      ".article-banner-img",
      {
        y: 300,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      "-=2"
    );

    descriptionRefs.current.forEach((ref, index) => {
      if (ref) {
        const splitDescription = new SplitType(ref, {
          types: "lines",
          lineClass: "line",
        });
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

          const dispLines =
            displacementRef.current.querySelectorAll(".line span");

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

        splitDescription.lines.forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
        });

        gsap.set(`#article-paragraph-${index} .line span`, {
          y: "100%",
          display: "block",
        });

        tl.to(
          `#article-paragraph-${index} .line span`,
          {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
          },
          "-=1.5"
        );
      }
    });
  }, [article, containerRef]);

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <div className="back-link" onClick={() => navigateTo("/editorial")}>
          Back to Editorial
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page" ref={containerRef}>
      <div className="article-content">
        <div className="article-detail-col">
          <div className="article-banner-img">
            <GridDistortion
              imageSrc={`/article_images/${article.bannerImg}`}
              grid={100}
              mouse={0.1}
              strength={0.15}
              relaxation={0.9}
              className="article-banner"
            />
          </div>
          <div>
            {bodyCopy.map((copy, index) => (
              <div className="article-copy" key={index}>
                <DisplacementText
                  text={copy}
                  splitBy="words"
                  className="article-paragraph anime-text"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="article-detail-col article-meta">
          <div className="article-date">
            <div className="revealer">
              <p>Date</p>
            </div>
            <div className="revealer">
              <p>{article.date}</p>
            </div>
          </div>
          <div className="article-title">
            <div className="revealer">
              <p>Article Name</p>
            </div>
            <div className="revealer">
              <p>{article.title}</p>
            </div>
          </div>
          <div className="article-author">
            <div className="revealer">
              <p>Author</p>
            </div>
            <div className="revealer">
              <p>By {article.author}</p>
            </div>
          </div>
          <div className="article-tags">
            <div className="revealer">
              <p>Tags</p>
            </div>
            <div className="tags">
              {article.tags.map((tag, index) => (
                <div className="revealer" key={index}>
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
