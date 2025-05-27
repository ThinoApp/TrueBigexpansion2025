/**
 * Fichier de mappage entre les références et les pages du catalogue
 * 
 * Chaque clé est l'ID d'une référence et la valeur est le numéro de page dans le catalogue
 * Note: Les pages commencent à 0 (0 étant la première page après la couverture)
 */

export const referenceToCataloguePage: Record<number, number> = {
  // FAISABILITE
  4: 5,   // GYMNASE PIERRE ET MARIE CURIE
  13: 12, // GYMNASE DE MTSAMBORO
  14: 15, // ESPACE CULTUREL-SALLE POLYVALENTE-GYMNASE ET TERRAIN DE FOOTBALL
  31: 22, // VESTIAIRES ET TRIBUNES DU STADE DE FOOTBALL DE MBOUINI
  38: 25, // AMÉNAGEMENT D'ESPACES DE NATATION SUR LE LITTORAL
  49: 30, // ZONE SPORTIVE ET CULTURELLE DE MTSAPÉRÉ BAOBAB
  60: 35, // SALLE DES FETES DE OUANGANI
  
  // AMO
  12: 8,  // STADE DE FOOTBALL DE M'TSAHARA
  54: 32, // CRÉATION TERRRAIN DE FOOTBALL DE BANDRANI
  
  // MOE
  1: 3,   // COMPLEXE SPORTIF DE LA POINTE DE TRIVAUX
  3: 10,  // CENTRE FOOTBALLISTIQUE ROBERT MARCHAND
  6: 18,  // PLATEAU SPORTIF ET ESPACE CULTUREL DE MAJICAVO KOROPA
  8: 20,  // STADE DE FOOTBALL DE MTSANGADOUA
  10: 28, // PLATEAU SPORTIF CENTRE
  
  // Ajouter d'autres mappages selon les besoins
};

/**
 * Fonction pour obtenir la page du catalogue correspondant à une référence
 * @param referenceId ID de la référence
 * @returns Numéro de page dans le catalogue, ou undefined si aucune correspondance n'est trouvée
 */
export const getCataloguePageForReference = (referenceId: number): number | undefined => {
  return referenceToCataloguePage[referenceId];
};
