import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useEmailForm } from "../../hooks/useEmailForm";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Liste complète des préfixes téléphoniques internationaux avec drapeaux
const phonePrefixes = [
  { code: "+93", country: "🇦🇫", name: "Afghanistan" },
  { code: "+355", country: "🇦🇱", name: "Albanie" },
  { code: "+213", country: "🇩🇿", name: "Algérie" },
  { code: "+376", country: "🇦🇩", name: "Andorre" },
  { code: "+244", country: "🇦🇴", name: "Angola" },
  { code: "+1", country: "🇺🇸", name: "États-Unis" },
  { code: "+54", country: "🇦🇷", name: "Argentine" },
  { code: "+374", country: "🇦🇲", name: "Arménie" },
  { code: "+61", country: "🇦🇺", name: "Australie" },
  { code: "+43", country: "🇦🇹", name: "Autriche" },
  { code: "+994", country: "🇦🇿", name: "Azerbaïdjan" },
  { code: "+1", country: "🇧🇸", name: "Bahamas" },
  { code: "+973", country: "🇧🇭", name: "Bahreïn" },
  { code: "+880", country: "🇧🇩", name: "Bangladesh" },
  { code: "+375", country: "🇧🇾", name: "Biélorussie" },
  { code: "+32", country: "🇧🇪", name: "Belgique" },
  { code: "+501", country: "🇧🇿", name: "Belize" },
  { code: "+229", country: "🇧🇯", name: "Bénin" },
  { code: "+975", country: "🇧🇹", name: "Bhoutan" },
  { code: "+591", country: "🇧🇴", name: "Bolivie" },
  { code: "+387", country: "🇧🇦", name: "Bosnie-Herzégovine" },
  { code: "+267", country: "🇧🇼", name: "Botswana" },
  { code: "+55", country: "🇧🇷", name: "Brésil" },
  { code: "+673", country: "🇧🇳", name: "Brunei" },
  { code: "+359", country: "🇧🇬", name: "Bulgarie" },
  { code: "+226", country: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", country: "🇧🇮", name: "Burundi" },
  { code: "+855", country: "🇰🇭", name: "Cambodge" },
  { code: "+237", country: "🇨🇲", name: "Cameroun" },
  { code: "+1", country: "🇨🇦", name: "Canada" },
  { code: "+238", country: "🇨🇻", name: "Cap-Vert" },
  { code: "+236", country: "🇨🇫", name: "République centrafricaine" },
  { code: "+235", country: "🇹🇩", name: "Tchad" },
  { code: "+56", country: "🇨🇱", name: "Chili" },
  { code: "+86", country: "🇨🇳", name: "Chine" },
  { code: "+57", country: "🇨🇴", name: "Colombie" },
  { code: "+269", country: "🇰🇲", name: "Comores" },
  { code: "+242", country: "🇨🇬", name: "République du Congo" },
  { code: "+243", country: "🇨🇩", name: "République démocratique du Congo" },
  { code: "+506", country: "🇨🇷", name: "Costa Rica" },
  { code: "+225", country: "🇨🇮", name: "Côte d'Ivoire" },
  { code: "+385", country: "🇭🇷", name: "Croatie" },
  { code: "+53", country: "🇨🇺", name: "Cuba" },
  { code: "+357", country: "🇨🇾", name: "Chypre" },
  { code: "+420", country: "🇨🇿", name: "République tchèque" },
  { code: "+45", country: "🇩🇰", name: "Danemark" },
  { code: "+253", country: "🇩🇯", name: "Djibouti" },
  { code: "+1", country: "🇩🇲", name: "Dominique" },
  { code: "+1", country: "🇩🇴", name: "République dominicaine" },
  { code: "+593", country: "🇪🇨", name: "Équateur" },
  { code: "+20", country: "🇪🇬", name: "Égypte" },
  { code: "+503", country: "🇸🇻", name: "Salvador" },
  { code: "+240", country: "🇬🇶", name: "Guinée équatoriale" },
  { code: "+291", country: "🇪🇷", name: "Érythrée" },
  { code: "+372", country: "🇪🇪", name: "Estonie" },
  { code: "+251", country: "🇪🇹", name: "Éthiopie" },
  { code: "+679", country: "🇫🇯", name: "Fidji" },
  { code: "+358", country: "🇫🇮", name: "Finlande" },
  { code: "+33", country: "🇫🇷", name: "France" },
  { code: "+241", country: "🇬🇦", name: "Gabon" },
  { code: "+220", country: "🇬🇲", name: "Gambie" },
  { code: "+995", country: "🇬🇪", name: "Géorgie" },
  { code: "+49", country: "🇩🇪", name: "Allemagne" },
  { code: "+233", country: "🇬🇭", name: "Ghana" },
  { code: "+30", country: "🇬🇷", name: "Grèce" },
  { code: "+1", country: "🇬🇩", name: "Grenade" },
  { code: "+502", country: "🇬🇹", name: "Guatemala" },
  { code: "+224", country: "🇬🇳", name: "Guinée" },
  { code: "+245", country: "🇬🇼", name: "Guinée-Bissau" },
  { code: "+592", country: "🇬🇾", name: "Guyana" },
  { code: "+509", country: "🇭🇹", name: "Haïti" },
  { code: "+504", country: "🇭🇳", name: "Honduras" },
  { code: "+852", country: "🇭🇰", name: "Hong Kong" },
  { code: "+36", country: "🇭🇺", name: "Hongrie" },
  { code: "+354", country: "🇮🇸", name: "Islande" },
  { code: "+91", country: "🇮🇳", name: "Inde" },
  { code: "+62", country: "🇮🇩", name: "Indonésie" },
  { code: "+98", country: "🇮🇷", name: "Iran" },
  { code: "+964", country: "🇮🇶", name: "Irak" },
  { code: "+353", country: "🇮🇪", name: "Irlande" },
  { code: "+972", country: "🇮🇱", name: "Israël" },
  { code: "+39", country: "🇮🇹", name: "Italie" },
  { code: "+1", country: "🇯🇲", name: "Jamaïque" },
  { code: "+81", country: "🇯🇵", name: "Japon" },
  { code: "+962", country: "🇯🇴", name: "Jordanie" },
  { code: "+7", country: "🇰🇿", name: "Kazakhstan" },
  { code: "+254", country: "🇰🇪", name: "Kenya" },
  { code: "+686", country: "🇰🇮", name: "Kiribati" },
  { code: "+383", country: "🇽🇰", name: "Kosovo" },
  { code: "+965", country: "🇰🇼", name: "Koweït" },
  { code: "+996", country: "🇰🇬", name: "Kirghizistan" },
  { code: "+856", country: "🇱🇦", name: "Laos" },
  { code: "+371", country: "🇱🇻", name: "Lettonie" },
  { code: "+961", country: "🇱🇧", name: "Liban" },
  { code: "+266", country: "🇱🇸", name: "Lesotho" },
  { code: "+231", country: "🇱🇷", name: "Liberia" },
  { code: "+218", country: "🇱🇾", name: "Libye" },
  { code: "+423", country: "🇱🇮", name: "Liechtenstein" },
  { code: "+370", country: "🇱🇹", name: "Lituanie" },
  { code: "+352", country: "🇱🇺", name: "Luxembourg" },
  { code: "+389", country: "🇲🇰", name: "Macédoine du Nord" },
  { code: "+261", country: "🇲🇬", name: "Madagascar" },
  { code: "+265", country: "🇲🇼", name: "Malawi" },
  { code: "+60", country: "🇲🇾", name: "Malaisie" },
  { code: "+960", country: "🇲🇻", name: "Maldives" },
  { code: "+223", country: "🇲🇱", name: "Mali" },
  { code: "+356", country: "🇲🇹", name: "Malte" },
  { code: "+692", country: "🇲🇭", name: "Îles Marshall" },
  { code: "+222", country: "🇲🇷", name: "Mauritanie" },
  { code: "+230", country: "🇲🇺", name: "Maurice" },
  { code: "+52", country: "🇲🇽", name: "Mexique" },
  { code: "+373", country: "🇲🇩", name: "Moldavie" },
  { code: "+377", country: "🇲🇨", name: "Monaco" },
  { code: "+976", country: "🇲🇳", name: "Mongolie" },
  { code: "+382", country: "🇲🇪", name: "Monténégro" },
  { code: "+212", country: "🇲🇦", name: "Maroc" },
  { code: "+258", country: "🇲🇿", name: "Mozambique" },
  { code: "+95", country: "🇲🇲", name: "Myanmar" },
  { code: "+264", country: "🇳🇦", name: "Namibie" },
  { code: "+674", country: "🇳🇷", name: "Nauru" },
  { code: "+977", country: "🇳🇵", name: "Népal" },
  { code: "+31", country: "🇳🇱", name: "Pays-Bas" },
  { code: "+64", country: "🇳🇿", name: "Nouvelle-Zélande" },
  { code: "+505", country: "🇳🇮", name: "Nicaragua" },
  { code: "+227", country: "🇳🇪", name: "Niger" },
  { code: "+234", country: "🇳🇬", name: "Nigeria" },
  { code: "+850", country: "🇰🇵", name: "Corée du Nord" },
  { code: "+47", country: "🇳🇴", name: "Norvège" },
  { code: "+968", country: "🇴🇲", name: "Oman" },
  { code: "+92", country: "🇵🇰", name: "Pakistan" },
  { code: "+680", country: "🇵🇼", name: "Palaos" },
  { code: "+970", country: "🇵🇸", name: "Palestine" },
  { code: "+507", country: "🇵🇦", name: "Panama" },
  { code: "+675", country: "🇵🇬", name: "Papouasie-Nouvelle-Guinée" },
  { code: "+595", country: "🇵🇾", name: "Paraguay" },
  { code: "+51", country: "🇵🇪", name: "Pérou" },
  { code: "+63", country: "🇵🇭", name: "Philippines" },
  { code: "+48", country: "🇵🇱", name: "Pologne" },
  { code: "+351", country: "🇵🇹", name: "Portugal" },
  { code: "+974", country: "🇶🇦", name: "Qatar" },
  { code: "+40", country: "🇷🇴", name: "Roumanie" },
  { code: "+7", country: "🇷🇺", name: "Russie" },
  { code: "+250", country: "🇷🇼", name: "Rwanda" },
  { code: "+1", country: "🇰🇳", name: "Saint-Kitts-et-Nevis" },
  { code: "+1", country: "🇱🇨", name: "Sainte-Lucie" },
  { code: "+1", country: "🇻🇨", name: "Saint-Vincent-et-les-Grenadines" },
  { code: "+685", country: "🇼🇸", name: "Samoa" },
  { code: "+378", country: "🇸🇲", name: "Saint-Marin" },
  { code: "+239", country: "🇸🇹", name: "Sao Tomé-et-Principe" },
  { code: "+966", country: "🇸🇦", name: "Arabie saoudite" },
  { code: "+221", country: "🇸🇳", name: "Sénégal" },
  { code: "+381", country: "🇷🇸", name: "Serbie" },
  { code: "+248", country: "🇸🇨", name: "Seychelles" },
  { code: "+232", country: "🇸🇱", name: "Sierra Leone" },
  { code: "+65", country: "🇸🇬", name: "Singapour" },
  { code: "+421", country: "🇸🇰", name: "Slovaquie" },
  { code: "+386", country: "🇸🇮", name: "Slovénie" },
  { code: "+677", country: "🇸🇧", name: "Îles Salomon" },
  { code: "+252", country: "🇸🇴", name: "Somalie" },
  { code: "+27", country: "🇿🇦", name: "Afrique du Sud" },
  { code: "+82", country: "🇰🇷", name: "Corée du Sud" },
  { code: "+211", country: "🇸🇸", name: "Soudan du Sud" },
  { code: "+34", country: "🇪🇸", name: "Espagne" },
  { code: "+94", country: "🇱🇰", name: "Sri Lanka" },
  { code: "+249", country: "🇸🇩", name: "Soudan" },
  { code: "+597", country: "🇸🇷", name: "Suriname" },
  { code: "+268", country: "🇸🇿", name: "Eswatini" },
  { code: "+46", country: "🇸🇪", name: "Suède" },
  { code: "+41", country: "🇨🇭", name: "Suisse" },
  { code: "+963", country: "🇸🇾", name: "Syrie" },
  { code: "+886", country: "🇹🇼", name: "Taïwan" },
  { code: "+992", country: "🇹🇯", name: "Tadjikistan" },
  { code: "+255", country: "🇹🇿", name: "Tanzanie" },
  { code: "+66", country: "🇹🇭", name: "Thaïlande" },
  { code: "+670", country: "🇹🇱", name: "Timor oriental" },
  { code: "+228", country: "🇹🇬", name: "Togo" },
  { code: "+676", country: "🇹🇴", name: "Tonga" },
  { code: "+1", country: "🇹🇹", name: "Trinité-et-Tobago" },
  { code: "+216", country: "🇹🇳", name: "Tunisie" },
  { code: "+90", country: "🇹🇷", name: "Turquie" },
  { code: "+993", country: "🇹🇲", name: "Turkménistan" },
  { code: "+688", country: "🇹🇻", name: "Tuvalu" },
  { code: "+256", country: "🇺🇬", name: "Ouganda" },
  { code: "+380", country: "🇺🇦", name: "Ukraine" },
  { code: "+971", country: "🇦🇪", name: "Émirats arabes unis" },
  { code: "+44", country: "🇬🇧", name: "Royaume-Uni" },
  { code: "+598", country: "🇺🇾", name: "Uruguay" },
  { code: "+998", country: "🇺🇿", name: "Ouzbékistan" },
  { code: "+678", country: "🇻🇺", name: "Vanuatu" },
  { code: "+39", country: "🇻🇦", name: "Vatican" },
  { code: "+58", country: "🇻🇪", name: "Venezuela" },
  { code: "+84", country: "🇻🇳", name: "Vietnam" },
  { code: "+967", country: "🇾🇪", name: "Yémen" },
  { code: "+260", country: "🇿🇲", name: "Zambie" },
  { code: "+263", country: "🇿🇼", name: "Zimbabwe" },
];

const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonePrefix: "+33", // Préfixe par défaut (France)
    phoneNumber: "",
    projectType: "",
    message: "",
  });

  // État pour gérer l'affichage du dropdown des préfixes
  const [showPrefixes, setShowPrefixes] = useState(false);
  // État pour le filtre de recherche des préfixes
  const [prefixSearch, setPrefixSearch] = useState("");
  // Référence pour le dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { sendEmail } = useEmailForm(
    "service_0f4p9z6", // À remplacer avec votre Service ID EmailJS
    "template_kj662na", // À remplacer avec votre Template ID EmailJS
    "9yP1AeZzN0qOg6QOI" // À remplacer avec votre Public Key EmailJS
  );

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPrefixes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
      setFormData({
        name: "",
        email: "",
        phonePrefix: "+33",
        phoneNumber: "",
        projectType: "",
        message: "",
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const inputClasses = `w-full px-4 py-3 bg-white/50 rounded-xl border border-white/20 
    backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/60 
    placeholder:text-black/40 text-black/80 transition-all duration-300`;

  // Fonction pour sélectionner un préfixe
  const selectPrefix = (prefix: string) => {
    setFormData({ ...formData, phonePrefix: prefix });
    setShowPrefixes(false);
    setPrefixSearch("");
  };

  // Filtrer les préfixes en fonction de la recherche
  const filteredPrefixes = prefixSearch
    ? phonePrefixes.filter(
        (item) =>
          item.code.includes(prefixSearch) ||
          item.name.toLowerCase().includes(prefixSearch.toLowerCase())
      )
    : phonePrefixes;

  // Trouver le pays correspondant au préfixe actuel
  const currentCountry =
    phonePrefixes.find((item) => item.code === formData.phonePrefix)?.country ||
    "🇫🇷";

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
                <div className="flex gap-2 relative">
                  {/* Sélecteur de préfixe */}
                  <div className="relative w-1/4" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`${inputClasses} flex items-center justify-between`}
                      onClick={() => setShowPrefixes(!showPrefixes)}
                    >
                      <span className="flex items-center">
                        <span className="text-xl mr-2">{currentCountry}</span>
                        <span className="text-sm">{formData.phonePrefix}</span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${
                          showPrefixes ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown des préfixes avec recherche */}
                    {showPrefixes && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 bg-white/90 backdrop-blur-md 
                        border border-white/20 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50"
                      >
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md p-2 border-b border-white/20">
                          <input
                            type="text"
                            className="w-full px-3 py-2 text-sm bg-white/50 rounded-lg border border-white/30 
                              focus:outline-none focus:border-black/30"
                            placeholder="Rechercher..."
                            value={prefixSearch}
                            onChange={(e) => setPrefixSearch(e.target.value)}
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredPrefixes.map((item) => (
                            <button
                              key={`${item.code}-${item.country}`}
                              type="button"
                              className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors flex items-center"
                              onClick={() => selectPrefix(item.code)}
                            >
                              <span className="text-xl mr-3">
                                {item.country}
                              </span>
                              <div>
                                <span className="font-medium">{item.code}</span>
                                {/* <span className="text-xs text-black/50 block">
                                  {item.name}
                                </span> */}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Champ pour le numéro */}
                  <input
                    type="tel"
                    placeholder="X XX XX XX XX"
                    className={`${inputClasses} w-3/4`}
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
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
