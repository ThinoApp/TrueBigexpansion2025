import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

const BIGLogo = () => (
  <svg
    viewBox="0 0 600 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* B */}
    <path
      d="M50 20
         h100 
         a40 40 0 0 1 0 80
         h-100
         v-80
         M50 100
         h100
         a40 40 0 0 1 0 80
         h-100
         v-80
         M50 20
         v160"
      stroke="white"
      strokeWidth="12"
      fill="none"
    />

    {/* Point */}
    <circle
      cx="220"
      cy="20"
      r="10"
      fill="white"
    />

    {/* I */}
    <path
      d="M220 50v130"
      stroke="white"
      strokeWidth="12"
      fill="none"
    />

    {/* Point */}
    <circle
      cx="300"
      cy="20"
      r="10"
      fill="white"
    />

    {/* G */}
    <path
      d="M390 50
         a70 70 0 0 1 0 140
         a70 70 0 0 1 0-140
         M390 80
         a40 40 0 0 0-40 40
         v30
         a40 40 0 0 0 40 40
         a40 40 0 0 0 40-40
         v-15
         h-40"
      stroke="white"
      strokeWidth="12"
      fill="none"
    />

    {/* EXPANSION text */}
    <text
      x="300"
      y="220"
      textAnchor="middle"
      fill="white"
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '24px',
        fontWeight: '200',
        letterSpacing: '0.2em'
      }}
    >
      EXPANSION
    </text>
  </svg>
);

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? "auto" : "none" }}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="relative"
          initial={false}
          animate={{ scale: isLoading ? 1 : 0.8 }}
        >
          {/* Cercle de chargement */}
          <motion.div
            className="w-48 h-48 relative"
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <motion.div 
              className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Texte B.I.G animé */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
            {/* B */}
            <motion.span
              className="text-5xl font-bold text-white"
              animate={{
                scale: [1, 1.2, 1],
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              B
            </motion.span>

            {/* Point */}
            <motion.span
              className="text-5xl font-bold text-white -translate-y-5"
              animate={{
                opacity: [0, 1, 0],
                y: ["-1.5rem", "-1.25rem", "-1.5rem"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              .
            </motion.span>

            {/* I */}
            <motion.span
              className="text-5xl font-bold text-white"
              animate={{
                rotateX: [0, 360],
                filter: [
                  "brightness(1)",
                  "brightness(1.5)",
                  "brightness(1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              I
            </motion.span>

            {/* Point */}
            <motion.span
              className="text-5xl font-bold text-white -translate-y-5"
              animate={{
                opacity: [0, 1, 0],
                y: ["-1.5rem", "-1.25rem", "-1.5rem"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            >
              .
            </motion.span>

            {/* G */}
            <motion.span
              className="text-5xl font-bold text-white"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 30px rgba(255,255,255,0.8)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              G
            </motion.span>
          </div>
        </motion.div>

        {/* Texte de chargement */}
        <motion.div 
          className="absolute bottom-[20%] left-0 right-0 text-center space-y-4"
          initial={false}
          animate={{ opacity: isLoading ? 1 : 0 }}
        >
          <motion.p 
            className="text-white/60 text-sm uppercase tracking-[0.2em]"
            animate={{ 
              opacity: [0.4, 1, 0.4],
              letterSpacing: ["0.2em", "0.3em", "0.2em"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            Chargement
          </motion.p>
          <motion.div 
            className="w-32 h-0.5 mx-auto bg-white/20 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-y-0 w-1/2 bg-white"
              animate={{ 
                x: ["-100%", "200%"],
                width: ["50%", "30%", "50%"]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 