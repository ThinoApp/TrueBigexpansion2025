import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeaderProps {
  currentSection: string;
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300
      ${isScrolled ? "bg-white/80" : "bg-transparent"} backdrop-blur-lg`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.0] }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="/images/assets/Logo BIG 2022.png"
            alt="BIG Logo"
            className="h-12 object-contain"
          />
          <span
            className={`font-light text-xl ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Expansion
          </span>
        </motion.div>

        <div className="flex items-center gap-8">
          {/* <a 
            href="tel:+33XXXXXXXX" 
            className={`transition-colors ${
              isScrolled ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white'
            }`}
          >
            +33 XX XX XX XX
          </a> */}
          <motion.button
            onClick={onContactClick}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-black text-white hover:bg-black/80"
                : "bg-white text-black hover:bg-white/90"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demander à être contacter
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
