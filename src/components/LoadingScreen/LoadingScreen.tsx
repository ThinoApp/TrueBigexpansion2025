import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Reset for continuous animation
          }
          return prev + 1;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Particules de fond */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          initial={false}
          animate={{ 
            scale: isLoading ? 1 : 0.8,
            filter: isLoading ? "blur(0px)" : "blur(4px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Cercles de progression concentriques */}
          <div className="relative w-72 h-72">
            {/* Cercle extérieur - Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.6)",
                  "0 0 0px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Cercle de progression principal */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Fond du cercle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Progression */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="283"
                animate={{
                  strokeDashoffset: [283, 0, 283],
                  rotate: [0, 360],
                }}
                transition={{
                  strokeDashoffset: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }
                }}
              />
              
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Cercle de fond blanc pour le logo */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 20px 40px rgba(0,0,0,0.3)",
                  "0 25px 50px rgba(0,0,0,0.4)",
                  "0 20px 40px rgba(0,0,0,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Logo BIG */}
              <motion.img
                src="/images/assets/Logo BIG 2022.png"
                alt="BIG Logo"
                className="w-28 h-28 object-contain"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: [
                    "brightness(1)",
                    "brightness(1.1)",
                    "brightness(1)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Points lumineux autour du cercle */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    rotate: angle + (isLoading ? 360 : 0),
                    x: 140,
                    y: -4,
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Texte de chargement */}
        <motion.div
          className="absolute bottom-[15%] left-0 right-0 text-center space-y-6"
          initial={false}
          animate={{ 
            opacity: isLoading ? 1 : 0,
            y: isLoading ? 0 : 20,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="text-white/80 text-lg font-light tracking-[0.3em] uppercase"
            animate={{
              opacity: [0.6, 1, 0.6],
              letterSpacing: ["0.3em", "0.4em", "0.3em"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Chargement en cours
          </motion.div>
          
          {/* Barre de progression */}
          <div className="w-64 mx-auto">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                animate={{
                  x: ["-100%", "100%"],
                  scaleX: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            {/* Pourcentage */}
            <motion.div
              className="text-center mt-3 text-white/60 text-sm font-mono"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {progress}%
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
