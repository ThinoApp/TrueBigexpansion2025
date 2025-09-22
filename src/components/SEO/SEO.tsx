import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO = ({
  title = "Big Expansion - Ingénierie BIG | Cabinet d'ingénierie et maîtrise d'œuvre",
  description = "Big Expansion (BIG) - Cabinet d'ingénierie spécialisé dans la conception et réalisation d'équipements sportifs et culturels. Maîtrise d'œuvre, assistance maîtrise d'ouvrage, programmation et pilotage d'opérations.",
  keywords = "Big Expansion, BIG, ingénierie, maîtrise d'œuvre, équipements sportifs, stades, terrains de foot, pistes d'athlétisme, tennis, infrastructures sportives, programmation, pilotage opérations, AMO, conception réalisation",
  image = "/images/assets/Logo BIG 2022.png",
  url = "https://bigexpansion.fr",
  type = "website",
  structuredData
}: SEOProps) => {
  
  useEffect(() => {
    // Mise à jour du titre
    document.title = title;

    // Fonction pour créer ou mettre à jour une balise meta
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.content = content;
    };

    // Balises meta de base
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Big Expansion - BIG');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'fr-FR');
    updateMetaTag('geo.region', 'FR');
    updateMetaTag('geo.country', 'France');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Big Expansion', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Balises supplémentaires pour le SEO local
    updateMetaTag('geo.placename', 'France');
    updateMetaTag('DC.title', title);
    updateMetaTag('DC.description', description);
    updateMetaTag('DC.language', 'fr');

    // Données structurées Schema.org
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Mise à jour de l'attribut lang du HTML
    document.documentElement.lang = 'fr';

  }, [title, description, keywords, image, url, type, structuredData]);

  return null;
};

export default SEO;
