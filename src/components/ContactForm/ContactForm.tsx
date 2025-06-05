import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEmailForm } from "../../hooks/useEmailForm";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const { sendEmail } = useEmailForm(
    "service_0f4p9z6", // À remplacer avec votre Service ID EmailJS
    "template_6em9nat", // À remplacer avec votre Template ID EmailJS
    "9yP1AeZzN0qOg6QOI" // À remplacer avec votre Public Key EmailJS
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
      onClose();
    } catch (err) {
      // L'erreur est déjà gérée par le hook
      console.error(err);
    }
  };

  const inputClasses = `w-full px-4 py-3 bg-white/50 rounded-xl border border-white/20 
    backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/60 
    placeholder:text-black/40 text-black/80 transition-all duration-300`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl 
            bg-white/70 backdrop-blur-2xl p-10 rounded-3xl z-50 
            shadow-[0_0_40px_rgba(0,0,0,0.1)] border border-white/30"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* En-tête du formulaire */}
            <div className="text-center mb-8">
              <motion.h3
                className="text-3xl font-light mb-3 text-black/80"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Parlons de votre projet
              </motion.h3>
              <motion.p
                className="text-black/60"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Nous vous répondrons dans les plus brefs délais
              </motion.p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-black/60 mb-2 ml-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm text-black/60 mb-2 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm text-black/60 mb-2 ml-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="+33 X XX XX XX XX"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm text-black/60 mb-2 ml-1">
                  Type de projet
                </label>
                <select
                  className={`${inputClasses} appearance-none`}
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                >
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="conception">Conception Réalisation</option>
                  <option value="assistance">
                    Assistance à Maîtrise d'Ouvrage
                  </option>
                  <option value="maitrise">Maîtrise d'Oeuvre</option>
                  <option value="programmation">Programmation</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm text-black/60 mb-2 ml-1">
                  Message
                </label>
                <textarea
                  placeholder="Décrivez votre projet en quelques mots..."
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </motion.div>

              <motion.div
                className="flex gap-4 pt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-black/10 rounded-xl 
                  hover:bg-black/5 text-black/70 hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white rounded-xl 
                  hover:bg-black/80 shadow-lg hover:shadow-xl 
                  transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Envoyer la demande
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
