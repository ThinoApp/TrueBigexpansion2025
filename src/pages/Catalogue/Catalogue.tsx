import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./catalogue.scss";

gsap.registerPlugin(ScrollTrigger);

// Interface pour les données des pages du catalogue
interface CataloguePage {
  id: string;
  imageSrc: string;
}

interface CatalogueProps {
  initialPage?: number;
}

const Catalogue = ({ initialPage }: CatalogueProps = {}) => {
  const [pageWidth, setPageWidth] = useState<number>(500);
  const [pageHeight, setPageHeight] = useState<number>(700);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [initialPageSet, setInitialPageSet] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [singlePageView, setSinglePageView] = useState<boolean>(false);
  const bookRef = useRef<any>(null);
  // Données des pages du catalogue
  const cataloguePages: CataloguePage[] = Array.from(
    { length: 77 },
    (_, i) => ({
      id: String(i + 1).padStart(2, "0"),
      imageSrc: `/images/catalogue/${i + 1}.jpg`,
    })
  );

  // Fonction pour gérer le chargement des images
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.add("loaded");
  };

  // Fonction pour basculer entre la vue une page et deux pages
  const togglePageView = () => {
    setSinglePageView(!singlePageView);
    // Nous forcerons un remontage du composant grâce à la clé
  };

  useEffect(() => {
    // Ajuster la taille des pages en fonction de la taille de l'écran
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isSmallScreen = screenWidth < 768;
      setIsMobile(isSmallScreen);

      // Forcer le mode une page sur les petits écrans
      if (isSmallScreen && !singlePageView) {
        setSinglePageView(true);
      }

      // Ajustement plus réactif pour différentes tailles d'écran
      let width;
      if (screenWidth < 480) {
        width = screenWidth * 0.8; // 80% de la largeur sur mobile
      } else if (screenWidth < 768) {
        width = screenWidth * 0.6; // 60% sur tablette
      } else if (screenWidth < 1024) {
        width = screenWidth * 0.45; // 45% sur petit écran
      } else {
        width = Math.min(screenWidth * 0.4, 500); // Max 500px sur grand écran
      }

      const height = width * 1.4; // Ratio approximatif d'une page A4
      setPageWidth(width);
      setPageHeight(height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [singlePageView]);

  // Effet pour aller à la page spécifiée une fois le livre chargé
  useEffect(() => {
    if (
      !loading &&
      bookRef.current &&
      initialPage !== undefined &&
      !initialPageSet
    ) {
      // Ajouter 1 pour la couverture
      const adjustedPage = initialPage + 1;

      if (adjustedPage >= 0 && adjustedPage <= cataloguePages.length + 1) {
        // Utiliser setTimeout pour s'assurer que le flipbook est complètement initialisé
        setTimeout(() => {
          bookRef.current.pageFlip().turnToPage(adjustedPage);
          setInitialPageSet(true);
        }, 300);
      }
    }
  }, [loading, initialPage, initialPageSet, cataloguePages.length]);

  // Fonction pour aller à la page suivante
  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  // Fonction pour aller à la page précédente
  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  // Gestionnaire d'événements pour le changement de page
  const handlePageChange = (e: any) => {
    const newPage = e.data;
    setCurrentPage(newPage);
  };

  // Fonction pour télécharger le catalogue
  const downloadCatalogue = () => {
    alert("Le téléchargement du catalogue sera disponible prochainement.");
    // Si vous avez un PDF à télécharger, vous pouvez utiliser ce code :
    // const link = document.createElement("a");
    // link.href = "/documents/catalogue.pdf";
    // link.download = "catalogue-big-expansion.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  useEffect(() => {
    // Animation d'entrée pour le titre
    gsap.fromTo(
      ".catalogue-title",
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Animation pour le flipbook
    gsap.fromTo(
      ".catalogue-flipbook",
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      className="catalogue-wrapper min-h-screen bg-black text-white py-10 px-0 overflow-y-auto overflow-x-hidden"
      style={{
        height: "100vh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        background: "linear-gradient(to bottom, #000000, #0f172a)",
      }}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="catalogue-title text-4xl md:text-5xl lg:text-6xl font-light mb-8 md:mb-12 text-center pt-10">
          Notre{" "}
          <span className="text-blue-400 relative">
            Catalogue
            <span className="absolute -inset-1 bg-blue-500/20 blur-xl"></span>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto">
          Feuilletez notre catalogue pour découvrir nos projets en détail
        </p>
      </div>

      <div className="catalogue-book-container relative z-10 mx-auto max-w-7xl">
        {loading ? (
          <motion.div
            className="catalogue-loading bg-gray-900/50 backdrop-blur-md rounded-xl border border-blue-500/20 p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-spinner"></div>
            <p className="text-blue-400">Chargement du catalogue...</p>
          </motion.div>
        ) : (
          <>
            {/* Effet de grille en arrière-plan */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "-1px -1px",
                }}
              ></div>
            </div>

            <motion.div
              className="catalogue-flipbook relative"
              data-single-view={singlePageView.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HTMLFlipBook
                key={`flipbook-${singlePageView ? "single" : "double"}`}
                width={pageWidth}
                height={pageHeight}
                size="fixed"
                minWidth={280}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1400}
                maxShadowOpacity={0.7}
                showCover={true}
                mobileScrollSupport={true}
                className="catalogue-book"
                ref={bookRef}
                startPage={currentPage}
                drawShadow={true}
                flippingTime={800}
                usePortrait={singlePageView || isMobile}
                startZIndex={20}
                autoSize={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={10}
                showPageCorners={true}
                disableFlipByClick={false}
                style={{ background: "transparent" }}
                onFlip={handlePageChange}
              >
                {/* Couverture */}
                <div className="catalogue-page">
                  <div className="catalogue-page-content catalogue-cover bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-500">
                    {/* Overlay de base avec opacité */}
                    <div className="absolute inset-0 bg-black/30 z-0"></div>

                    {/* Motif de grille en arrière-plan */}
                    <div className="absolute inset-0 overflow-hidden z-0">
                      <div
                        className="w-full h-full opacity-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                          backgroundPosition: "-1px -1px",
                        }}
                      ></div>
                    </div>

                    {/* Effet de particules/étoiles */}
                    <div className="absolute inset-0 z-0 catalogue-particles"></div>

                    {/* Cercle décoratif lumineux */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-blue-500/10 blur-3xl z-0 catalogue-glow"></div>

                    {/* Contenu de la couverture */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                      {/* Logo avec effet amélioré */}
                      <div className="catalogue-logo-container mb-4 sm:mb-8">
                        <img
                          src="/images/assets/Logo BIG 2022.png"
                          alt="BIG Logo"
                          className="catalogue-cover-logo relative drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] max-w-[70%] sm:max-w-[80%]"
                          onLoad={handleImageLoad}
                        />
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full catalogue-logo-glow"></div>
                      </div>

                      {/* Titre avec effet de texte amélioré */}
                      <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-4 sm:mb-6 catalogue-cover-title">
                        <span className="catalogue-glowing-text">
                          CATALOGUE
                        </span>
                      </h1>

                      {/* Ligne décorative */}
                      <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-300/80 via-white/90 to-blue-300/80 rounded-full mb-4 sm:mb-6 catalogue-divider"></div>

                      {/* Sous-titre */}
                      <p className="relative z-10 text-xl sm:text-2xl font-light tracking-widest mb-2 text-blue-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
                        BIG EXPANSION
                      </p>

                      <p className="relative z-10 text-lg sm:text-xl font-light tracking-wide text-blue-200/90 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                        2025
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pages du catalogue */}
                {cataloguePages.map((page) => (
                  <div className="catalogue-page" key={page.id}>
                    <div className="catalogue-page-content bg-white">
                      <div className="catalogue-page-container">
                        <img
                          src={page.imageSrc}
                          alt={`Page ${page.id}`}
                          className="catalogue-page-image"
                          loading="lazy"
                          onLoad={handleImageLoad}
                        />
                        <div className="page-number bg-gray-800/70 text-white border border-blue-500/20 backdrop-blur-sm">
                          {page.id}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quatrième de couverture */}
                <div className="catalogue-page">
                  <div className="catalogue-page-content back-cover bg-gradient-to-br from-blue-500 to-blue-900">
                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                    <div className="absolute inset-0 overflow-hidden z-0">
                      <div
                        className="w-full h-full opacity-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                          backgroundPosition: "-1px -1px",
                        }}
                      ></div>
                    </div>
                    <h2 className="relative z-10 text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      BIG Expansion
                    </h2>
                    <div className="relative z-10 flex flex-col gap-2 text-white/90">
                      <p className="text-base sm:text-lg font-light">
                        www.bigexpansion.eu
                      </p>
                      <p className="text-base sm:text-lg font-light">
                        contact@bigexpansion.fr
                      </p>
                      <div className="w-16 sm:w-20 h-1 bg-white/30 mx-auto my-3 sm:my-4 rounded-full"></div>
                      <p className="text-base sm:text-lg font-medium">2025</p>
                    </div>
                  </div>
                </div>
              </HTMLFlipBook>

              {/* Effet de lueur sous le livre */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-blue-500/20 blur-3xl rounded-full"></div>
            </motion.div>

            <motion.div
              className="catalogue-controls mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                className="control-button prev bg-gray-900/70 backdrop-blur-md border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white transition-all duration-300"
                onClick={goToPrevPage}
                aria-label="Page précédente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-6 sm:h-6"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="page-indicator bg-gray-900/70 backdrop-blur-md border border-blue-500/20 text-blue-300 text-sm sm:text-base">
                <span id="page-current" className="font-medium">
                  {currentPage + 1}
                </span>{" "}
                / <span id="page-total">{cataloguePages.length + 2}</span>
              </div>

              <button
                className="control-button next bg-gray-900/70 backdrop-blur-md border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white transition-all duration-300"
                onClick={goToNextPage}
                aria-label="Page suivante"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-6 sm:h-6"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <button
                className={`view-toggle-button bg-gray-900/70 backdrop-blur-md border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white transition-all duration-300 ${
                  singlePageView ? "active-view" : ""
                } hidden md:flex`}
                onClick={togglePageView}
                aria-label={
                  singlePageView ? "Mode deux pages" : "Mode une page"
                }
                title={
                  singlePageView
                    ? "Actuellement en mode une page - Cliquer pour voir deux pages"
                    : "Actuellement en mode deux pages - Cliquer pour voir une page"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-6 sm:h-6"
                >
                  {singlePageView ? (
                    // Icône pour vue deux pages
                    <>
                      <rect x="3" y="4" width="8" height="16" rx="1" />
                      <rect x="13" y="4" width="8" height="16" rx="1" />
                    </>
                  ) : (
                    // Icône pour vue une page
                    <rect x="6" y="4" width="12" height="16" rx="1" />
                  )}
                </svg>
              </button>
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        className="catalogue-footer mt-8 sm:mt-10 mb-6 sm:mb-8 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button
          className="download-button bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 sm:gap-3 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/40 text-sm sm:text-base"
          onClick={downloadCatalogue}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-6 sm:h-6"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger le PDF
        </button>
      </motion.div>
    </div>
  );
};

export default Catalogue;
