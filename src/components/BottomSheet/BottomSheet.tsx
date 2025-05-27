import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Home, Briefcase, Building2, Users, Clock, BookOpen, MapPin, ChevronDown } from "lucide-react";

interface BottomSheetProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  disabled?: boolean;
}

const BottomSheet = ({ currentSection, onNavigate, disabled }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      id: "hero", 
      label: "Accueil",
      icon: <Home size={24} strokeWidth={1.5} />
    },
    { 
      id: "services", 
      label: "Services",
      icon: <Briefcase size={24} strokeWidth={1.5} />
    },
    { 
      id: "realisations", 
      label: "Réalisations",
      icon: <Building2 size={24} strokeWidth={1.5} />
    },
    { 
      id: "references", 
      label: "Références",
      icon: <Users size={24} strokeWidth={1.5} />
    },
    { 
      id: "timelapses", 
      label: "Timelapses",
      icon: <Clock size={24} strokeWidth={1.5} />
    },
    { 
      id: "catalogue", 
      label: "Catalogue",
      icon: <BookOpen size={24} strokeWidth={1.5} />
    },
    { 
      id: "agencies", 
      label: "Agences",
      icon: <MapPin size={24} strokeWidth={1.5} />
    },
  ];

  return (
    <>
      <motion.button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 bg-white/90 backdrop-blur-lg rounded-full p-4 
        border border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] 
        hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] 
        transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} stroke="black" strokeWidth={2} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-white/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white/50 backdrop-blur-xl 
              border-t border-white/50 rounded-t-[2.5rem] z-50 p-8
              shadow-[0_-10px_40px_rgba(255,255,255,0.3)]"
            >
              <div className="w-12 h-1 bg-black/20 rounded-full mx-auto mb-8" />
              <nav className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      if (!disabled) {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`group relative overflow-hidden p-6 rounded-2xl transition-all duration-300
                    border backdrop-blur-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${
                      currentSection === item.id
                        ? "bg-black text-white border-black shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                        : "bg-white/50 text-black/70 border-white/30 hover:bg-white/70"
                    }`}
                    whileHover={!disabled ? { scale: 1.02 } : {}}
                    whileTap={!disabled ? { scale: 0.98 } : {}}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                      <motion.div 
                        className={currentSection === item.id ? "text-white" : "text-black/60"}
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span className="text-lg font-light tracking-wide">{item.label}</span>
                      {currentSection === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheet; 