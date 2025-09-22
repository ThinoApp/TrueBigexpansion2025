#!/usr/bin/env node

/**
 * Script de validation SEO pour Big Expansion
 * Vérifie que toutes les optimisations SEO sont en place
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 Validation SEO - Big Expansion\n');

let errors = 0;
let warnings = 0;
let success = 0;

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}`);
    success++;
    return true;
  } else {
    console.log(`❌ ${description} - MANQUANT`);
    errors++;
    return false;
  }
}

function checkFileContent(filePath, searchTerm, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchTerm)) {
      console.log(`✅ ${description}`);
      success++;
      return true;
    } else {
      console.log(`⚠️  ${description} - NON TROUVÉ`);
      warnings++;
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description} - ERREUR: ${error.message}`);
    errors++;
    return false;
  }
}

// 1. Fichiers essentiels
console.log('📁 Vérification des fichiers essentiels:');
checkFile(path.join(projectRoot, 'public', 'sitemap.xml'), 'Sitemap.xml présent');
checkFile(path.join(projectRoot, 'public', 'robots.txt'), 'Robots.txt présent');
checkFile(path.join(projectRoot, 'src', 'components', 'SEO', 'SEO.tsx'), 'Composant SEO présent');
checkFile(path.join(projectRoot, 'src', 'data', 'seoData.ts'), 'Données SEO présentes');

console.log('\n📝 Vérification du contenu HTML:');
// 2. Contenu de l'index.html
const indexPath = path.join(projectRoot, 'index.html');
checkFileContent(indexPath, 'lang="fr"', 'Langue française définie');
checkFileContent(indexPath, 'Big Expansion', 'Titre contient "Big Expansion"');
checkFileContent(indexPath, 'og:title', 'Balises Open Graph présentes');
checkFileContent(indexPath, 'twitter:card', 'Twitter Cards configurées');

console.log('\n🎯 Vérification des mots-clés:');
// 3. Mots-clés dans les composants
const heroPath = path.join(projectRoot, 'src', 'pages', 'Hero', 'Hero.tsx');
checkFileContent(heroPath, 'Big Expansion', 'Hero contient "Big Expansion"');
checkFileContent(heroPath, 'ingénierie BIG', 'Hero contient "ingénierie BIG"');
checkFileContent(heroPath, 'sr-only', 'Titre SEO invisible présent');

const servicesPath = path.join(projectRoot, 'src', 'pages', 'Services', 'Services.tsx');
checkFileContent(servicesPath, 'sr-only', 'Services - Titre SEO présent');

console.log('\n📊 Vérification des données structurées:');
// 4. Schema.org
const seoDataPath = path.join(projectRoot, 'src', 'data', 'seoData.ts');
checkFileContent(seoDataPath, 'schema.org', 'Schema.org configuré');
checkFileContent(seoDataPath, 'Organization', 'Schema Organization présent');
checkFileContent(seoDataPath, 'WebSite', 'Schema Website présent');
checkFileContent(seoDataPath, 'Big Expansion', 'Schema contient "Big Expansion"');

console.log('\n🖼️ Vérification des images:');
// 5. Optimisation des images
checkFileContent(heroPath, 'alt=', 'Attributs alt présents dans Hero');
const realisationsPath = path.join(projectRoot, 'src', 'pages', 'Realisations', 'Realisations.tsx');
checkFileContent(realisationsPath, 'Big Expansion BIG', 'Alt optimisés dans Réalisations');

console.log('\n🔗 Vérification du sitemap:');
// 6. Sitemap
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
checkFileContent(sitemapPath, 'bigexpansion.fr', 'Sitemap contient le domaine');
checkFileContent(sitemapPath, 'priority', 'Priorités définies dans sitemap');

console.log('\n🤖 Vérification du robots.txt:');
// 7. Robots.txt
const robotsPath = path.join(projectRoot, 'public', 'robots.txt');
checkFileContent(robotsPath, 'Sitemap:', 'Robots.txt référence le sitemap');
checkFileContent(robotsPath, 'Allow: /', 'Robots.txt autorise l\'indexation');

console.log('\n📱 Vérification de la structure:');
// 8. Structure sémantique
checkFileContent(heroPath, '<h1', 'Titre H1 présent');
checkFileContent(servicesPath, '<h2', 'Titres H2 présents');
checkFileContent(servicesPath, '<h3', 'Titres H3 présents');

// Résumé
console.log('\n' + '='.repeat(50));
console.log('📊 RÉSUMÉ DE LA VALIDATION SEO');
console.log('='.repeat(50));
console.log(`✅ Succès: ${success}`);
console.log(`⚠️  Avertissements: ${warnings}`);
console.log(`❌ Erreurs: ${errors}`);

const total = success + warnings + errors;
const scorePercentage = Math.round((success / total) * 100);

console.log(`\n🎯 Score SEO: ${scorePercentage}% (${success}/${total})`);

if (errors === 0 && warnings === 0) {
  console.log('\n🎉 EXCELLENT ! Toutes les optimisations SEO sont en place.');
  console.log('   Votre site est prêt pour un meilleur référencement sur "Big Expansion" et "Ingénierie BIG".');
} else if (errors === 0) {
  console.log('\n✅ BIEN ! Optimisations principales OK, quelques améliorations possibles.');
} else {
  console.log('\n⚠️  ATTENTION ! Des optimisations critiques sont manquantes.');
}

console.log('\n📚 Consultez SEO_OPTIMIZATIONS.md pour plus de détails.');

// Exit code pour CI/CD
process.exit(errors > 0 ? 1 : 0);
