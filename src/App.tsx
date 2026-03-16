import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./pages/Hero/Hero";
import Services from "./pages/Services/Services";
import Realisations from "./pages/Realisations/Realisations";
import References from "./pages/References/References";
import Agencies from "./pages/Agencies/Agencies";
import Timelapses from "./pages/Timelapses/Timelapses";
import Catalogue from "./pages/Catalogue/Catalogue";
import Maintenance from "./pages/Maintenance/Maintenance";
import SEO from "./components/SEO/SEO";
import { pagesSEO, organizationSchema, websiteSchema, serviceSchema } from "./data/seoData";
import "./App.css";
import "./styles/pageTransition.scss";
import BottomSheet from "./components/BottomSheet/BottomSheet";
import Header from "./components/Header/Header";
import ContactForm from "./components/ContactForm/ContactForm";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { useLoading } from "./hooks/useLoading";
import { useSEOAnalytics } from "./hooks/useSEOAnalytics";

type Section =
  | "hero"
  | "services"
  | "realisations"
  | "references"
  | "agencies"
  | "timelapses"
  | "catalogue"
  | "maintenance";

const variants = {
  enter: (direction: number) => ({
    x: 0,
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.2,
    rotateX: direction > 0 ? 30 : -30,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  },
  exit: (direction: number) => ({
    x: 0,
    y: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.8,
    rotateX: direction < 0 ? 30 : -30,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  }),
};

function App() {
  // Check if maintenance mode is enabled
  const isMaintenanceMode =
    sessionStorage.getItem("maintenanceMode") === "false";
  const initialSection: Section = isMaintenanceMode ? "maintenance" : "hero";

  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { isLoading, withLoading } = useLoading();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Analytics SEO en temps réel (développement uniquement)
  // const { seoScore } = useSEOAnalytics();
  useSEOAnalytics();
  const [cataloguePage, setCataloguePage] = useState<number | undefined>(
    undefined
  );

  // console.log("SEO Score :", seoScore);
  const handlePageTransition = async (newDirection: number) => {
    // Si nous sommes en mode maintenance, bloquer toute navigation
    if (currentSection === "maintenance") {
      console.log("Navigation bloquée - Le site est en maintenance");
      return;
    }

    setIsTransitioning(true);

    const sections: Section[] = [
      "hero",
      "services",
      "realisations",
      "references",
      "timelapses",
      "catalogue",
      "agencies",
      "maintenance",
    ];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = currentIndex + newDirection;

    if (nextIndex >= 0 && nextIndex < sections.length) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPage([page + newDirection, newDirection]);
      setCurrentSection(sections[nextIndex]);
    } else if (nextIndex >= sections.length) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPage([0, newDirection]);
      setCurrentSection(sections[0]);
    }

    setIsTransitioning(false);
  };

  const paginate = (newDirection: number) => {
    // Si nous sommes en mode maintenance, bloquer toute navigation
    if (currentSection === "maintenance") {
      console.log("Navigation bloquée - Le site est en maintenance");
      return;
    }

    if (!isTransitioning) {
      handlePageTransition(newDirection);
    }
  };

  const handleNavigateToServices = () => paginate(-1);
  const handleNavigateToServicesFromHero = () => paginate(1);
  const handleNavigateToRealisations = () => paginate(1);
  const handleNavigateToHero = () => paginate(-1);
  const handleNavigateToReferences = () => {
    // Si nous sommes en mode maintenance, bloquer toute navigation
    if (currentSection === "maintenance") {
      console.log("Navigation bloquée - Le site est en maintenance");
      return;
    }

    const sections: Section[] = [
      "hero",
      "services",
      "realisations",
      "references",
      "timelapses",
      "maintenance",
    ];
    const currentIndex = sections.indexOf(currentSection);
    const targetIndex = sections.indexOf("references");
    const direction = targetIndex > currentIndex ? 1 : -1;
    setPage([targetIndex, direction]);
    setCurrentSection("references");
  };

  // Fonction pour naviguer vers le catalogue avec une page spécifique
  const navigateToCatalogueWithPage = (pageNumber?: number) => {
    // Si nous sommes en mode maintenance, bloquer toute navigation
    if (currentSection === "maintenance") {
      console.log("Navigation bloquée - Le site est en maintenance");
      return;
    }

    setCataloguePage(pageNumber);
    handleNavigateToSection("catalogue");
  };

  const handleNavigateToSection = async (section: string) => {
    // Si nous sommes en mode maintenance, ne permettre aucune navigation
    if (currentSection === "maintenance") {
      console.log("Navigation bloquée - Le site est en maintenance");
      return;
    }

    if (isTransitioning) return;

    await withLoading(async () => {
      setIsTransitioning(true);
      const sections: Section[] = [
        "hero",
        "services",
        "realisations",
        "references",
        "timelapses",
        "catalogue",
        "agencies",
      ];
      const currentIndex = sections.indexOf(currentSection);
      const targetIndex = sections.indexOf(section as Section);
      const direction = targetIndex > currentIndex ? 1 : -1;

      await new Promise((resolve) => setTimeout(resolve, 1700));

      setPage([targetIndex, direction]);
      setCurrentSection(section as Section);
      setIsTransitioning(false);
    });
  };

  // Fonction pour obtenir les données SEO selon la section
  const getSEOData = (section: Section) => {
    const baseSchema = [organizationSchema, websiteSchema];
    
    switch (section) {
      case 'hero':
        return {
          ...pagesSEO.home,
          structuredData: baseSchema
        };
      case 'services':
        return {
          ...pagesSEO.services,
          structuredData: [...baseSchema, serviceSchema]
        };
      case 'realisations':
        return {
          ...pagesSEO.realisations,
          structuredData: baseSchema
        };
      case 'references':
        return {
          ...pagesSEO.references,
          structuredData: baseSchema
        };
      case 'agencies':
        return {
          ...pagesSEO.agencies,
          structuredData: baseSchema
        };
      default:
        return {
          ...pagesSEO.home,
          structuredData: baseSchema
        };
    }
  };

  const currentSEO = getSEOData(currentSection);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-black perspective-1000">
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        structuredData={currentSEO.structuredData}
      />
      <LoadingScreen isLoading={isLoading || isTransitioning} />

      {currentSection !== "maintenance" && (
        <Header
          currentSection={currentSection}
          onContactClick={() => setIsContactOpen(true)}
          onNavigateHome={() => handleNavigateToSection("hero")}
        />
      )}

      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {currentSection === "hero" ? (
          <motion.div
            key="hero"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              }
            }}
          >
            <Hero onNavigateToServices={handleNavigateToServicesFromHero} onNavigate={handleNavigateToSection} />
          </motion.div>
        ) : currentSection === "services" ? (
          <motion.div
            key="services"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <Services
              onNavigateToRealisations={handleNavigateToRealisations}
              onNavigateToHero={handleNavigateToHero}
            />
          </motion.div>
        ) : currentSection === "realisations" ? (
          <motion.div
            key="realisations"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d"
          >
            <Realisations
              onNavigateToServices={handleNavigateToServices}
              onNavigateToReferences={handleNavigateToReferences}
            />
          </motion.div>
        ) : currentSection === "references" ? (
          <motion.div
            key="references"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.y, velocity.y);
              if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <References onNavigateToCatalogue={navigateToCatalogueWithPage} />
          </motion.div>
        ) : currentSection === "timelapses" ? (
          <motion.div
            key="timelapses"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d overflow-y-auto"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(e, _) => {
              // Empêcher le comportement de drag par défaut si l'utilisateur fait défiler le contenu
              const scrollableElement = document.querySelector(
                ".timelapses-container"
              );
              if (scrollableElement) {
                const { scrollTop, scrollHeight, clientHeight } =
                  scrollableElement;
                const isScrollable = scrollHeight > clientHeight;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                // Si on peut défiler et qu'on n'est ni en haut ni en bas, bloquer le drag
                if (isScrollable && !isAtTop && !isAtBottom) {
                  e.stopPropagation();
                }
              }
            }}
            onDragEnd={(_, { offset, velocity }) => {
              // Seulement activer les gestes de navigation quand on est en haut ou en bas de la page
              const scrollableElement = document.querySelector(
                ".timelapses-container"
              );
              if (scrollableElement) {
                const { scrollTop, scrollHeight, clientHeight } =
                  scrollableElement;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                const swipe = swipePower(offset.y, velocity.y);
                if (swipe < -swipeConfidenceThreshold && isAtBottom) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold && isAtTop) {
                  paginate(-1);
                }
              }
            }}
          >
            <Timelapses />
          </motion.div>
        ) : currentSection === "catalogue" ? (
          <motion.div
            key="catalogue"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d overflow-y-auto"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(e, _) => {
              // Empêcher le comportement de drag par défaut si l'utilisateur fait défiler le contenu
              const scrollableElement = document.querySelector(
                ".catalogue-container"
              );
              if (scrollableElement) {
                const { scrollTop, scrollHeight, clientHeight } =
                  scrollableElement;
                const isScrollable = scrollHeight > clientHeight;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                // Si on peut défiler et qu'on n'est ni en haut ni en bas, bloquer le drag
                if (isScrollable && !isAtTop && !isAtBottom) {
                  e.stopPropagation();
                }
              }
            }}
            onDragEnd={(_, { offset, velocity }) => {
              // Seulement activer les gestes de navigation quand on est en haut ou en bas de la page
              const scrollableElement = document.querySelector(
                ".catalogue-container"
              );
              if (scrollableElement) {
                const { scrollTop, scrollHeight, clientHeight } =
                  scrollableElement;
                const isAtTop = scrollTop <= 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                const swipe = swipePower(offset.y, velocity.y);
                if (swipe < -swipeConfidenceThreshold && isAtBottom) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold && isAtTop) {
                  paginate(-1);
                }
              }
            }}
          >
            <Catalogue initialPage={cataloguePage} />
          </motion.div>
        ) : currentSection === "maintenance" ? (
          <motion.div
            key="maintenance"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d"
          >
            <Maintenance />
          </motion.div>
        ) : (
          <motion.div
            key="agencies"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full preserve-3d overflow-y-auto"
          >
            <Agencies />
          </motion.div>
        )}
      </AnimatePresence>

      {currentSection !== "maintenance" && (
        <BottomSheet
          currentSection={currentSection}
          onNavigate={handleNavigateToSection}
          disabled={isTransitioning}
        />
      )}

      {/* Badge créateur Surf Software */}
      {currentSection !== "maintenance" && (
        <motion.a
          href="https://surfsoftware.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 left-4 sm:left-8 z-40 flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3
            bg-white/20 backdrop-blur-md border border-white/30 rounded-xl
            shadow-[0_0_15px_rgba(255,255,255,0.1)]
            hover:bg-white/30 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
            transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.645, 0.045, 0.355, 1.0] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/images/Surf/logo.png"
            alt="Surf Software - Créateur du site"
            className="h-6 sm:h-8 object-contain group-hover:brightness-110 transition-all duration-300"
          />
          <span className="text-white/70 text-xs sm:text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300">
            Créé par Surf Web Development
          </span>
        </motion.a>
      )}

      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default App;
