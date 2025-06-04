import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, X } from "lucide-react";
import "./timelapses.scss";

gsap.registerPlugin(ScrollTrigger);

interface TimelapseVideo {
  id: number;
  title: string;
  path: string;
  description: string;
  thumbnail: string;
}

const timelapseVideos: TimelapseVideo[] = [
  {
    id: 1,
    title: "Bourges Mélange",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/BOURGES MELANGE.mp4",
    description:
      "Processus de mélange des matériaux sur le chantier de Bourges",
    thumbnail: "/images/thumbnails/BOURGES MELANGE.png",
  },
  {
    id: 2,
    title: "Bourges Traitement",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/BOURGES TRAITEMENT big.mp4",
    description: "Traitement spécial sur le site de Bourges",
    thumbnail: "/images/thumbnails/BOURGES TRAITEMENT big.png",
  },
  {
    id: 3,
    title: "Couverture Montholon",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/Couverture Montholon TIMELAPSE.mp4",
    description: "Installation de la couverture sur le projet Montholon",
    thumbnail: "/images/thumbnails/Couverture Montholon TIMELAPSE.png",
  },
  {
    id: 4,
    title: "Dépose Gazon Jean Brivot",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/DEPOSE GAZON JEAN BRIVOT BIG.mp4",
    description: "Processus de dépose du gazon sur le site Jean Brivot",
    thumbnail: "/images/thumbnails/DEPOSE GAZON JEAN BRIVOT BIG.png",
  },
  {
    id: 5,
    title: "Pose Gazon Synthétique",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/POSE GAZON SYNTHETIQUE BIG.mp4",
    description: "Installation professionnelle de gazon synthétique",
    thumbnail: "/images/thumbnails/POSE GAZON SYNTHETIQUE BIG.png",
  },
  {
    id: 6,
    title: "Substrat",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/SUBSTRAT TIMELAPSE BIG.mp4",
    description: "Application du substrat spécial pour surfaces végétalisées",
    thumbnail: "/images/thumbnails/SUBSTRAT TIMELAPSE BIG.png",
  },
  {
    id: 7,
    title: "Mitry",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/TIMELAPSE MITRY BIG.mp4",
    description: "Vue accélérée du chantier de Mitry",
    thumbnail: "/images/thumbnails/TIMELAPSE MITRY BIG.png",
  },
  {
    id: 8,
    title: "Charléty",
    path: "http://doc.bigexpansion.eu/TIMELAPSE/Vidéo finale Timelapse Charléty BIG.mp4",
    description: "Projet complet de rénovation du stade Charléty",
    thumbnail: "/images/thumbnails/Vidéo finale Timelapse Charléty BIG.png",
  },
];

const Timelapses = () => {
  const [activeVideo, setActiveVideo] = useState<TimelapseVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelapseGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée pour la grille de timelapses avec un délai plus court
    if (timelapseGridRef.current?.children) {
      gsap.fromTo(
        timelapseGridRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }

    // Animation pour le titre avec un délai plus court
    gsap.fromTo(
      ".timelapses-title",
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
  }, []);

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [activeVideo, isPlaying]);

  const handleVideoSelect = (video: TimelapseVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);

    // Scroll vers le haut de la page pour voir la vidéo sélectionnée
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCloseVideo = () => {
    gsap.to(".video-player-container", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      onComplete: () => {
        setActiveVideo(null);
        setIsPlaying(false);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="timelapses-container min-h-screen bg-black text-white py-10 px-0 overflow-y-auto overflow-x-hidden"
      style={{
        height: "100vh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="timelapses-title text-4xl md:text-5xl lg:text-6xl font-light mb-8 md:mb-12 text-center pt-10">
          Nos <span className="text-blue-400">Timelapses</span>
        </h1>

        <p className="text-lg md:text-xl text-center text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto">
          Découvrez nos projets en accéléré. Ces timelapses vous permettent de
          visualiser l'évolution complète de nos chantiers en quelques minutes.
        </p>

        {activeVideo && (
          <motion.div
            className="video-player-container mb-10 md:mb-16 rounded-lg overflow-hidden shadow-2xl bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-auto"
                controls={false}
                playsInline
              >
                <source src={activeVideo.path} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>

              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="play-button w-20 h-20 rounded-full bg-white bg-opacity-30 flex items-center justify-center backdrop-blur-sm transition-transform transform hover:scale-110"
                  >
                    <Play className="w-10 h-10 text-black" />
                  </button>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-medium">{activeVideo.title}</h3>
                    <p className="text-gray-300">{activeVideo.description}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-black" />
                      ) : (
                        <Play className="w-6 h-6 text-black" />
                      )}
                    </button>

                    <button
                      onClick={handleCloseVideo}
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      <X className="w-6 h-6 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div
          ref={timelapseGridRef}
          className="bento-grid pb-20 px-2 md:px-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gridAutoRows: "minmax(200px, auto)",
            gap: "1.5rem",
            gridAutoFlow: "dense",
          }}
        >
          {timelapseVideos.map((video, index) => {
            // Déterminer la taille de la carte en fonction de l'index
            const isLarge = index % 5 === 0; // Première carte et toutes les 5 cartes
            const isWide = index % 7 === 3; // Toutes les 7 cartes, décalé de 3
            const isTall = index % 6 === 2; // Toutes les 6 cartes, décalé de 2

            return (
              <div
                key={video.id}
                className={`timelapse-card relative cursor-pointer transform perspective-1000 transition-all duration-500 hover:z-10 group`}
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  gridRow: isTall ? "span 2" : "span 1",
                  ...(isLarge && { gridColumn: "span 2", gridRow: "span 2" }),
                }}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="bento-card-inner w-full h-full relative rounded-2xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-gray-900 to-blue-950 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
                  {/* Effet 3D au survol */}
                  <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 group-hover:rotate-y-3 group-hover:rotate-x-3 preserve-3d">
                    {/* Image de couverture avec effet de parallaxe et glassmorphism */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-70 filter saturate-[1.2]"
                        loading="lazy"
                        style={{ transformStyle: "preserve-3d" }}
                      />

                      {/* Overlay futuriste avec effet néon */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-black/80 z-20"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] z-20 mix-blend-overlay"></div>

                      {/* Effet de grille futuriste */}
                      <div className="absolute inset-0 z-20 opacity-30 mix-blend-overlay pointer-events-none">
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

                      {/* Effet de lueur néon sur les bords */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                      </div>
                    </div>

                    {/* Vidéo en arrière-plan qui se lance au survol avec effet de profondeur */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl transform translate-z-10">
                      <video
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500 scale-[1.02]"
                        muted
                        loop
                        onMouseEnter={(e) => {
                          e.currentTarget.play();
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      >
                        <source src={video.path} type="video/mp4" />
                      </video>
                    </div>

                    {/* Badge de durée avec effet néon */}
                    <div className="absolute top-3 right-3 z-30 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-blue-500/30 text-xs text-blue-300 font-medium">
                      <span className="drop-shadow-glow">03:24</span>
                    </div>

                    {/* Contenu texte avec effet de déplacement et glassmorphism */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-30 transform transition-all duration-500 group-hover:translate-y-0 translate-y-8 w-full">
                      <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border-t border-l border-white/10 w-full shadow-[0_-5px_25px_rgba(0,0,0,0.3)] transform transition-transform duration-500 group-hover:translate-z-20">
                        <h3 className="text-lg font-medium text-white mb-2 w-full drop-shadow-glow">
                          {video.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 w-full opacity-80 group-hover:opacity-100">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Icône de lecture avec effet de pulse et glassmorphism */}
                  <div className="absolute inset-0 flex items-center justify-center z-40 w-full transform transition-transform duration-500 group-hover:translate-z-30">
                    <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-50 border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                      <div className="absolute w-full h-full rounded-full bg-blue-400/20 animate-ping"></div>
                      <Play className="w-10 h-10 text-white drop-shadow-glow" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timelapses;
