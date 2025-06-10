import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageTransition from "../../components/PageTransition";
import "./hero.scss";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigateToServices: () => void;
}

const Hero = ({ onNavigateToServices }: HeroProps) => {
  const [isEntering, setIsEntering] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setIsEntering(true);
  }, []);
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const images = [
    "/images/hero_services/9-erieta-attali-scaled.jpeg",
    "/images/hero_services/551-Bannière pointe de Trivaux.webp",
    "/images/hero_services/20250523_101225.jpg",
    "/images/hero_services/20250523_101909.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Préchargement des images pour une meilleure performance mobile
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images", error);
        // En cas d'erreur, on continue quand même
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    // Ne démarrer le diaporama que lorsque les images sont chargées
    if (!imagesLoaded) return;

    // Gestion du diaporama avec GSAP
    const slideInterval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;

      // Préparer la prochaine image
      if (nextBgRef.current) {
        nextBgRef.current.style.backgroundImage = `url(${images[nextIndex]})`;
        nextBgRef.current.style.filter = "brightness(0.6)";

        // Animation de transition - optimisée pour mobile
        const duration = window.innerWidth < 768 ? 1 : 1.5;

        gsap.fromTo(
          nextBgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            ease: "power2.inOut",
            onComplete: () => {
              // Mettre à jour l'image actuelle
              if (bgRef.current) {
                bgRef.current.style.backgroundImage = `url(${images[nextIndex]})`;
                bgRef.current.style.filter = "brightness(0.6)";
              }
              if (nextBgRef.current) {
                nextBgRef.current.style.opacity = "0";
              }
              setCurrentImageIndex(nextIndex);
            },
          }
        );
      }
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentImageIndex, images.length, imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded) return;

    // Définir l'état initial
    gsap.set(
      [
        titleRef.current?.querySelectorAll(".word"),
        contentRef.current?.children,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Animation initiale - optimisée pour mobile
    const isMobile = window.innerWidth < 768;
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Fond
    tl.fromTo(
      bgRef.current,
      {
        scale: isMobile ? 1.05 : 1.1,
        filter: "brightness(0) blur(10px)",
      },
      {
        scale: 1,
        filter: "brightness(0.5) blur(0px)",
        duration: isMobile ? 1 : 1.5,
      }
    );

    // Animation des mots du titre
    const titleWords = titleRef.current?.querySelectorAll(".word");
    if (titleWords) {
      tl.to(
        titleWords,
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.8 : 1,
          stagger: isMobile ? 0.15 : 0.2,
          ease: "power4.out",
        },
        "-=1"
      );
    }

    // Animation des éléments de contenu
    const contentElements = contentRef.current?.children || [];
    tl.to(
      [...contentElements],
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.6 : 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Animation de l'indicateur de défilement
    tl.fromTo(
      scrollIndicatorRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animation continue de l'indicateur de défilement
    gsap.to(scrollIndicatorRef.current?.querySelector(".scroll-line") || {}, {
      scaleY: 0.6,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: "power1.inOut",
    });

    // Nettoyage
    return () => {
      tl.kill();
    };
  }, [imagesLoaded]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      onNavigateToServices();
    }
  });

  const handleServicesClick = () => {
    onNavigateToServices();
  };

  // Gestion améliorée des événements tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // Seuil de swipe plus sensible pour mobile
    if (diff > 30) {
      onNavigateToServices();
    }

    setTouchStartY(null);
  };

  return (
    <PageTransition isEntering={isEntering}>
      <section
        ref={ref}
        className="Hero min-h-screen relative bg-black overflow-hidden"
        onWheel={(e) => {
          if (e.deltaY > 0) {
            onNavigateToServices();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background avec effet optimisé */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 will-change-transform bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />
        {/* Couche de transition pour l'animation */}
        <div
          ref={nextBgRef}
          className="absolute inset-0 z-1 will-change-transform bg-cover bg-center"
          style={{
            opacity: 0,
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />

        {/* Overlay avec motif */}
        <div className="absolute inset-0 z-10 bg-pattern opacity-30" />

        {/* Contenu */}
        <div
          ref={contentRef}
          className="relative z-20 container mx-auto px-4 sm:px-6 h-screen flex flex-col justify-center items-start"
        >
          <div className="w-full md:w-2/3 lg:w-1/2 space-y-8 sm:space-y-12">
            {/* Tag line */}
            <div className="space-y-3">
              {/* <div className="text-white/70 text-lg tracking-wider uppercase">
              Cabinet d'ingénierie
            </div> */}
              {/* <h2 className="text-3xl md:text-4xl font-light text-black w-fit tracking-wide bg-white flex items-center px-4 py-2 rounded-lg modern-title"> */}
              {/* <span className="inline-block items-center bg-white rounded-full overflow-hidden px-2">
                <img
                  src="/images/assets/Logo BIG 2022.png"
                  className="w-24 border-2 object-cover "
                  alt="logo big"
                />
              </span> */}
              {/* <br />
                <span className="text-black/90">B.I.G</span>
                <span className="text-black/70 ml-2">Expansion</span>
              </h2> */}
            </div>

            {/* Titre principal */}
            <div className="space-y-4 sm:space-y-5">
              <h1
                ref={titleRef}
                className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight"
              >
                <div className="word overflow-hidden">
                  <span className="block">Penser.</span>
                </div>
                <div className="word overflow-hidden">
                  <span className="block">Concevoir.</span>
                </div>
                <div className="word overflow-hidden">
                  <span className="block">Réaliser.</span>
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              Nous sommes spécialisés dans la conception et la réalisation de
              projets innovants, alliant expertise technique et créativité pour
              donner vie à vos ambitions.
            </p>

            {/* Call to action */}
            <div className="flex flex-row space-x-6">
              <button className="px-8 py-4 bg-white text-black hover:bg-opacity-90 transition-colors duration-300">
                Découvrir
              </button>
              <button
                onClick={handleServicesClick}
                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                Nos services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Meilleure visibilité sur mobile */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={onNavigateToServices}
        >
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <div className="text-white/50 text-xs sm:text-sm uppercase tracking-widest">
              Explorer
            </div>
            <div className="scroll-line" />
          </div>
        </div>

        {/* Préchargement invisible des images */}
        <div className="hidden">
          {images.map((src, index) => (
            <img key={index} src={src} alt="preload" />
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default Hero;
