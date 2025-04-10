import React from "react";
import { Link } from "react-router-dom";

const Welcome = ({ role }) => {
  // Définition du contenu dynamique en fonction du rôle
  const content = {
    CDC: {
      title: "Bonjour et Bienvenue, Responsable CDC !",
      description:
        "En tant que Responsable CDC, vous êtes chargé de gérer la création des formations pour votre centre. Si vous êtes prêt, cliquez sur le bouton ci-dessous.",
      link: "ajouter-formation",
      buttonText: "Créer une Formation →",
    },
    DREF: {
      title: "Bonjour et Bienvenue, Responsable DREF !",
      description:
        "En tant que directeur DREF, vous supervisez les admissions en formation au niveau régional. Vous pouvez gérer et vérifier vos cours ici.",
      link: "formations",
      buttonText: "Gérer les Formations →",
    },
    ANIMATEUR: {
      title: "Bonjour et Bienvenue, Animateur !",
      description:
        "En tant qu'animateur, vous pouvez gérer les formations et les participants. Vous pouvez aussi consulter les statistiques des formations.",
      link: "formationsAnimateur",
      buttonText: "Voir les Formations →",
    }, // ❗ Ajout de cette accolade fermante
  };

  // Sélection du contenu en fonction du rôle (CDC par défaut si aucun rôle défini)
  const { title, description, link, buttonText } = content[role] || content["CDC"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 p-4 sm:ml-64">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-500 mt-2">{title}</h3>
        <p className="text-gray-600 mt-4">{description}</p>
        <div>
          <Link
            to={link}
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-700 transition"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
