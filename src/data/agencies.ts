import { faker } from '@faker-js/faker';

// Fonction pour générer un membre d'équipe aléatoire
const generateTeamMember = () => ({
  name: faker.person.fullName(),
  role: faker.helpers.arrayElement([
    "Directeur d'agence",
    "Chargé de projet",
    "Architecte",
    "Ingénieur structure",
    "Responsable commercial",
    "Chef de chantier",
    "Conducteur de travaux",
    "Responsable études",
  ]),
  photo: faker.image.avatar(),
});

// Générer une équipe de taille aléatoire entre 5 et 8 personnes
const generateTeam = () => {
  const teamSize = faker.number.int({ min: 5, max: 8 });
  return Array.from({ length: teamSize }, generateTeamMember);
};

export const agencies = [
  {
    id: "mayotte",
    name: "BIG Expansion Mayotte",
    location: "Mayotte",
    coordinates: {
      lat: -12.8275,
      lng: 45.1662,
    },
    address: "97600 Mamoudzou, Mayotte",
    phone: "+262 639 XXX XXX",
    email: "contact.mayotte@big-expansion.com",
    image: "/images/agences/mayotte.jpg",
    imageMin: "/images/agences-min/mayotte.jpg",
    team: generateTeam(),
  },
  {
    id: "reunion",
    name: "BIG Expansion Réunion",
    location: "La Réunion",
    coordinates: {
      lat: -21.1151,
      lng: 55.5364,
    },
    address: "97400 Saint-Denis, La Réunion",
    phone: "+262 262 XXX XXX",
    email: "contact.reunion@big-expansion.com",
    image: "/images/agences/LaReunion.jpg",
    imageMin: "/images/agences-min/LaReunion.jpg",
    team: generateTeam(),
  },
  {
    id: "madagascar",
    name: "BIG Expansion Madagascar",
    location: "Madagascar",
    coordinates: {
      lat: -18.8792,
      lng: 47.5079,
    },
    address: "101 Antananarivo, Madagascar",
    phone: "+261 XX XX XXX XX",
    email: "contact.madagascar@big-expansion.com",
    image: "/images/agences/madagascar.jpg",
    imageMin: "/images/agences-min/madagascar.jpg",
    team: generateTeam(),
  },
  {
    id: "maurice",
    name: "BIG Expansion Maurice",
    location: "Île Maurice",
    coordinates: {
      lat: -20.3484,
      lng: 57.5522,
    },
    address: "Port Louis, Île Maurice",
    phone: "+230 XXX XXXX",
    email: "contact.maurice@big-expansion.com",
    image: "/images/agences/maurice.jpg",
    imageMin: "/images/agences-min/maurice.jpg",
    team: generateTeam(),
  },
  {
    id: "metropole",
    name: "BIG Expansion Métropole",
    location: "France Métropolitaine",
    coordinates: {
      lat: 48.8566,
      lng: 2.3522,
    },
    address: "75000 Paris, France",
    phone: "+33 1 XX XX XX XX",
    email: "contact.paris@big-expansion.com",
    image: "/images/agences/metropole.jpg",
    imageMin: "/images/agences-min/metropole.jpg",
    team: generateTeam(),
  },
]; 