import { useEffect, useState } from 'react';

interface SEOMetrics {
  pageTitle: string;
  metaDescription: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imgWithoutAlt: number;
  schemaPresent: boolean;
  canonicalUrl: string;
  lang: string;
  openGraphPresent: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const useSEOAnalytics = () => {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [seoScore, setSeoScore] = useState<number>(0);

  useEffect(() => {
    const analyzeSEO = () => {
      // Analyse des éléments SEO
      const pageTitle = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const h3Count = document.querySelectorAll('h3').length;
      const imgWithoutAlt = document.querySelectorAll('img:not([alt])').length;
      const schemaPresent = document.querySelector('script[type="application/ld+json"]') !== null;
      const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const lang = document.documentElement.lang;
      const openGraphPresent = document.querySelector('meta[property^="og:"]') !== null;

      const metrics: SEOMetrics = {
        pageTitle,
        metaDescription,
        h1Count,
        h2Count,
        h3Count,
        imgWithoutAlt,
        schemaPresent,
        canonicalUrl,
        lang,
        openGraphPresent
      };

      setSeoMetrics(metrics);

      // Calcul du score SEO
      let score = 0;
      
      // Titre (25 points)
      if (pageTitle.length > 0 && pageTitle.length <= 60) score += 25;
      else if (pageTitle.length > 0) score += 15;

      // Meta description (20 points)
      if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 20;
      else if (metaDescription.length > 0) score += 10;

      // Structure des titres (20 points)
      if (h1Count === 1) score += 10;
      if (h2Count > 0) score += 5;
      if (h3Count > 0) score += 5;

      // Images optimisées (10 points)
      if (imgWithoutAlt === 0) score += 10;
      else if (imgWithoutAlt <= 2) score += 5;

      // Données structurées (10 points)
      if (schemaPresent) score += 10;

      // Open Graph (5 points)
      if (openGraphPresent) score += 5;

      // URL canonique (5 points)
      if (canonicalUrl) score += 5;

      // Langue définie (5 points)
      if (lang === 'fr') score += 5;

      setSeoScore(score);
    };

    const analyzePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Web Vitals si disponibles
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach((entry) => {
              if (entry.entryType === 'paint') {
                if (entry.name === 'first-contentful-paint') {
                  setPerformanceMetrics(prev => ({
                    ...prev!,
                    firstContentfulPaint: entry.startTime
                  }));
                }
              }
              
              if (entry.entryType === 'largest-contentful-paint') {
                setPerformanceMetrics(prev => ({
                  ...prev!,
                  largestContentfulPaint: entry.startTime
                }));
              }
              
              if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                setPerformanceMetrics(prev => ({
                  ...prev!,
                  cumulativeLayoutShift: (prev?.cumulativeLayoutShift || 0) + (entry as any).value
                }));
              }
            });
          });

          observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
        }

        setPerformanceMetrics({
          loadTime,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0,
          cumulativeLayoutShift: 0
        });
      }
    };

    // Analyser après le chargement de la page
    if (document.readyState === 'complete') {
      analyzeSEO();
      analyzePerformance();
    } else {
      window.addEventListener('load', () => {
        analyzeSEO();
        analyzePerformance();
      });
    }

    // Ré-analyser quand le contenu change (pour les SPA)
    const observer = new MutationObserver(() => {
      setTimeout(analyzeSEO, 100); // Délai pour laisser le DOM se mettre à jour
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['content']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Fonction pour logger les recommandations SEO
  const getSEORecommendations = (): string[] => {
    const recommendations: string[] = [];
    
    if (!seoMetrics) return recommendations;

    if (seoMetrics.pageTitle.length === 0) {
      recommendations.push('Ajouter un titre à la page');
    } else if (seoMetrics.pageTitle.length > 60) {
      recommendations.push('Raccourcir le titre (max 60 caractères)');
    }

    if (seoMetrics.metaDescription.length === 0) {
      recommendations.push('Ajouter une meta description');
    } else if (seoMetrics.metaDescription.length < 120 || seoMetrics.metaDescription.length > 160) {
      recommendations.push('Optimiser la meta description (120-160 caractères)');
    }

    if (seoMetrics.h1Count === 0) {
      recommendations.push('Ajouter un titre H1');
    } else if (seoMetrics.h1Count > 1) {
      recommendations.push('Utiliser un seul titre H1 par page');
    }

    if (seoMetrics.h2Count === 0) {
      recommendations.push('Ajouter des titres H2 pour structurer le contenu');
    }

    if (seoMetrics.imgWithoutAlt > 0) {
      recommendations.push(`${seoMetrics.imgWithoutAlt} image(s) sans attribut alt`);
    }

    if (!seoMetrics.schemaPresent) {
      recommendations.push('Ajouter des données structurées Schema.org');
    }

    if (!seoMetrics.openGraphPresent) {
      recommendations.push('Ajouter les balises Open Graph');
    }

    if (!seoMetrics.canonicalUrl) {
      recommendations.push('Définir une URL canonique');
    }

    if (seoMetrics.lang !== 'fr') {
      recommendations.push('Définir la langue française (lang="fr")');
    }

    return recommendations;
  };

  // Log des métriques en mode développement
  useEffect(() => {
    if (import.meta.env.DEV && seoMetrics) {
      console.group('🔍 SEO Analytics - Big Expansion');
      console.log('📊 Score SEO:', `${seoScore}/100`);
      console.log('📝 Métriques:', seoMetrics);
      if (performanceMetrics) {
        console.log('⚡ Performance:', performanceMetrics);
      }
      const recommendations = getSEORecommendations();
      if (recommendations.length > 0) {
        console.log('💡 Recommandations:', recommendations);
      }
      console.groupEnd();
    }
  }, [seoMetrics, performanceMetrics, seoScore]);

  return {
    seoMetrics,
    performanceMetrics,
    seoScore,
    recommendations: getSEORecommendations()
  };
};
