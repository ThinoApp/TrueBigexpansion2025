import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./header.scss";

interface HeaderProps {
  currentSection: string;
  onContactClick: () => void;
  onNavigateHome?: () => void;
}

const Header = ({ onContactClick, onNavigateHome }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300
      ${isScrolled ? "bg-white/80" : "bg-transparent"} backdrop-blur-lg`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.0] }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Forme parallélogramme sur la moitié gauche */}
        <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
          <div 
            className={`absolute inset-0 transition-all duration-300 ${
              isScrolled 
                ? "bg-gradient-to-r from-white/90 to-white/60" 
                : "bg-gradient-to-r from-white/25 to-white/10"
            } backdrop-blur-md`}
            style={{
              clipPath: 'polygon(0% 0%, 85% 0%, 75% 100%, 0% 100%)',
              width: '100%',
              height: '100%'
            }}
          />
          {/* Effet de lueur supplémentaire */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ${
              isScrolled 
                ? "bg-gradient-to-r from-blue-50/20 to-transparent" 
                : "bg-gradient-to-r from-white/15 to-transparent"
            }`}
            style={{
              clipPath: 'polygon(0% 0%, 80% 0%, 70% 100%, 0% 100%)',
              width: '95%',
              height: '100%'
            }}
          />
        </div>

        <motion.button
          className="flex items-center gap-2 cursor-pointer relative z-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigateHome && onNavigateHome()}
        >
          <div className="relative p-2 sm:p-3 transition-all duration-300">
            <img
              src="/images/assets/Logo BIG 2022.png"
              alt="BIG Logo"
              className="h-6 sm:h-20 object-contain relative z-30 drop-shadow-lg"
            />
            {/* Halo autour du logo */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 ${
                isScrolled
                  ? "bg-white/40 opacity-50"
                  : "bg-white/20 opacity-80"
              } rounded-full blur-xl scale-150`}
            />
          </div>
          {/* <span
            className={`font-light text-lg sm:text-xl ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Expansion
          </span> */}
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden  items-center gap-8 header-contact-info">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden header-contact-info-mobile">
          <motion.button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-md ${
              isScrolled ? "text-black" : "text-white"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`md:hidden absolute top-full left-0 right-0 p-4 ${
              isScrolled ? "bg-white/90" : "bg-black/90"
            } backdrop-blur-lg`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={onContactClick}
              className={`w-full px-6 py-3 rounded-full transition-all duration-300 text-center ${
                isScrolled
                  ? "bg-black text-white hover:bg-black/80"
                  : "bg-white text-black hover:bg-white/90"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Demander à être contacter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
