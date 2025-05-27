import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./pageTransition.scss";

interface PageTransitionProps {
  children: React.ReactNode;
  isEntering: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isEntering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEntering) {
      // Créer les panneaux de transition
      const panels = Array.from({ length: 5 }).map(() => {
        const panel = document.createElement("div");
        panel.className = "transition-panel";
        overlayRef.current?.appendChild(panel);
        return panel;
      });

      // Créer les particules
      const particlesContainer = particlesRef.current;
      if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particlesContainer.appendChild(particle);
        }
      }

      // Animation d'entrée
      const tl = gsap.timeline();

      // Initialisation
      gsap.set(containerRef.current, {
        opacity: 1,
        scale: 1.1,
        filter: "blur(10px)",
      });

      gsap.set(panels, {
        scaleY: 0,
        transformOrigin: "bottom",
      });

      gsap.set(".particle", {
        opacity: 0,
        scale: 0,
        y: 100,
      });

      // Séquence d'animation
      tl.to(panels, {
        scaleY: 1,
        duration: 0.8,
        stagger: {
          amount: 0.3,
          from: "center",
        },
        ease: "power3.inOut",
      })
        .to(
          ".particle",
          {
            opacity: 1,
            scale: "random(0.5, 2)",
            y: "random(-200, 200)",
            x: "random(-200, 200)",
            rotation: "random(-180, 180)",
            duration: 1,
            stagger: {
              amount: 0.3,
              from: "random",
            },
            ease: "power4.out",
          },
          "-=0.4"
        )
        .to(
          containerRef.current,
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .to(
          panels,
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.8,
            stagger: {
              amount: 0.3,
              from: "center",
            },
            ease: "power3.inOut",
          },
          "-=0.5"
        )
        .to(
          ".particle",
          {
            opacity: 0,
            duration: 0.3,
            stagger: {
              amount: 0.1,
              from: "random",
            },
            onComplete: () => {
              if (particlesContainer) {
                particlesContainer.innerHTML = "";
              }
              if (overlayRef.current) {
                overlayRef.current.innerHTML = "";
              }
            },
          },
          "-=0.6"
        );
    }
  }, [isEntering]);

  return (
    <div className="page-transition-wrapper">
      <div ref={containerRef} className="page-content">
        {children}
      </div>
      <div ref={overlayRef} className="panels-container" />
      <div ref={particlesRef} className="particles-container" />
    </div>
  );
};

export default PageTransition;
