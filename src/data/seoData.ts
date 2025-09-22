// Données structurées Schema.org pour Big Expansion
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Big Expansion",
  "alternateName": ["BIG", "B.I.G", "Ingénierie BIG"],
  "description": "Cabinet d'ingénierie spécialisé dans la conception et réalisation d'équipements sportifs et culturels",
  "url": "https://bigexpansion.fr",
  "logo": "https://bigexpansion.fr/images/assets/Logo BIG 2022.png",
  "foundingDate": "2022",
  "industry": "Ingénierie et construction",
  "serviceType": [
    "Conception Réalisation",
    "Assistance à Maîtrise d'Ouvrage",
    "Maîtrise d'Œuvre", 
    "Programmation",
    "Pilotage d'Opérations"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "knowsAbout": [
    "Équipements sportifs",
    "Stades de football", 
    "Pistes d'athlétisme",
    "Courts de tennis",
    "Infrastructures culturelles",
    "Maîtrise d'œuvre",
    "Ingénierie du sport"
  ],
  "sameAs": [
    // Ajoutez ici les liens vers les réseaux sociaux quand disponibles
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Big Expansion",
  "alternateName": "BIG - Bureau d'Ingénierie",
  "url": "https://bigexpansion.fr",
  "description": "Site officiel de Big Expansion (BIG) - Cabinet d'ingénierie spécialisé dans les équipements sportifs et culturels",
  "inLanguage": "fr-FR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bigexpansion.fr/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Données pour chaque page
export const pagesSEO = {
  home: {
    title: "Big Expansion - Ingénierie BIG | Conception et réalisation d'équipements sportifs",
    description: "Big Expansion (BIG) - Cabinet d'ingénierie leader dans la conception et réalisation d'équipements sportifs : stades, terrains de football, pistes d'athlétisme, courts de tennis. Maîtrise d'œuvre et expertise technique.",
    keywords: "Big Expansion, BIG, ingénierie sportive, stades, terrains football, pistes athlétisme, tennis, maîtrise œuvre, conception réalisation, équipements sportifs",
  },
  services: {
    title: "Services d'ingénierie - Big Expansion BIG | Maîtrise d'œuvre et conception",
    description: "Découvrez nos services d'ingénierie : Conception Réalisation, Maîtrise d'Œuvre, AMO, Programmation et Pilotage d'Opérations pour vos projets d'équipements sportifs et culturels.",
    keywords: "services ingénierie, maîtrise œuvre, conception réalisation, AMO, programmation, pilotage opérations, Big Expansion, BIG",
  },
  realisations: {
    title: "Réalisations - Big Expansion BIG | Projets d'équipements sportifs",
    description: "Découvrez nos réalisations récentes : Stade Alfred Depège Bourges, Stade Bel Air Beaugency, terrains de football, pistes d'athlétisme, courts de tennis. Expertise confirmée en ingénierie sportive.",
    keywords: "réalisations, projets, stades, Bourges, Beaugency, terrains football, pistes athlétisme, tennis, travaux, Big Expansion, BIG",
  },
  references: {
    title: "Références clients - Big Expansion BIG | Partenaires et collectivités",
    description: "Nos références et partenaires : collectivités, clubs sportifs, institutions. Témoignages de confiance pour nos projets d'ingénierie d'équipements sportifs et culturels.",
    keywords: "références, clients, partenaires, collectivités, clubs sportifs, témoignages, Big Expansion, BIG",
  },
  agencies: {
    title: "Agences - Big Expansion BIG | Implantations et contact",
    description: "Retrouvez nos agences et bureaux d'études Big Expansion (BIG). Contact et implantations pour vos projets d'ingénierie d'équipements sportifs en France.",
    keywords: "agences, bureaux, contact, implantations, Big Expansion, BIG, France",
  }
};

// Schema pour les services
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ingénierie d'équipements sportifs",
  "provider": {
    "@type": "Organization",
    "name": "Big Expansion",
    "alternateName": "BIG"
  },
  "areaServed": {
    "@type": "Country", 
    "name": "France"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services d'ingénierie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Conception Réalisation",
          "description": "Conception et réalisation d'équipements sportifs et culturels"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Assistance à Maîtrise d'Ouvrage",
          "description": "Accompagnement des collectivités dans leurs décisions techniques et budgétaires"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Maîtrise d'Œuvre",
          "description": "Coordination complète de projet de la conception à l'exécution"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Programmation", 
          "description": "Programmation détaillée intégrant aspects techniques, fonctionnels et environnementaux"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pilotage d'Opérations",
          "description": "Gestion rigoureuse des délais, coûts et qualité"
        }
      }
    ]
  }
};
