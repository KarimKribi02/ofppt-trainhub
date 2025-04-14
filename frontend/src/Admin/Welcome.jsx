import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, BarChart3 } from "lucide-react";

const Welcome = ({ role }) => {
  // Définition du contenu dynamique en fonction du rôle
  const content = {
    CDC: {
      title: "Bonjour et Bienvenue",
      subtitle: "Responsable CDC",
      description:
        "En tant que Responsable CDC, vous êtes chargé de gérer la création des formations pour votre centre. Accédez à toutes vos ressources depuis cette interface.",
      link: "ajouter-formation",
      buttonText: "Créer une Formation",
      icon: <BookOpen className="w-16 h-16 text-orange-500 mb-4" />,
      bgPattern: "cdc-pattern",
    },
    DREF: {
      title: "Bonjour et Bienvenue",
      subtitle: "Responsable DREF",
      description:
        "En tant que directeur DREF, vous supervisez les admissions en formation au niveau régional. Consultez et gérez l'ensemble des formations disponibles.",
      link: "formations",
      buttonText: "Gérer les Formations",
      icon: <Users className="w-16 h-16 text-orange-500 mb-4" />,
      bgPattern: "dref-pattern",
    },
    ANIMATEUR: {
      title: "Bonjour et Bienvenue",
      subtitle: "Animateur",
      description:
        "En tant qu'animateur, vous avez accès à la gestion des participants et des formations. Suivez également les statistiques et le déroulement des sessions.",
      link: "formationsAnimateur",
      buttonText: "Voir les Formations",
      icon: <BarChart3 className="w-16 h-16 text-orange-500 mb-4" />,
      bgPattern: "animateur-pattern",
    },
    ADMIN: {
      title: "Bonjour et Bienvenue",
      subtitle: "Administrateur",
      description:
        "En tant qu'administrateur, vous avez accès à toutes les fonctionnalités de l'application. Gérer les utilisateurs, les formations et les statistiques.",
      link: "ajouter_CDC",
      buttonText: "Gérer les Utilisateurs",
      icon: <Users className="w-16 h-16 text-orange-500 mb-4" />,
      bgPattern: "admin-pattern",
    },
    RESPONSABLE_DR: {
      title: "Bonjour et Bienvenue",
      subtitle: "Responsable DR",
      description:
        "En tant que Responsable DR, vous avez accès à la gestion des formations et des participants. Accédez à toutes vos ressources depuis cette interface.",
      link: "formations",
      buttonText: "Voir les Formations",
      icon: <BookOpen className="w-16 h-16 text-orange-500 mb-4" />,
      bgPattern: "dr-pattern",
    },
  };

  // Sélection du contenu en fonction du rôle (CDC par défaut si aucun rôle défini)
  const { title, subtitle, description, link, buttonText, icon, bgPattern } = content[role] || content["CDC"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4 sm:ml-64">
      <div className="relative w-full max-w-3xl">
        {/* Cercles décoratifs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-100 rounded-full opacity-40 blur-xl"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-100 rounded-full opacity-40 blur-xl"></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Bande décorative en haut */}
          <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
          
          <div className="grid md:grid-cols-5 gap-0">
            {/* Partie gauche (image/décoration) - visible uniquement sur medium et plus */}
            <div className="hidden md:flex md:col-span-2 bg-orange-500 justify-center items-center p-8 relative">
              <div className="absolute inset-0 opacity-10">
                <div className={`h-full w-full ${bgPattern}`}>
                  {/* Pattern serait défini dans votre CSS global */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="rounded-full bg-white opacity-20"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                {icon}
                <h2 className="text-white text-xl font-bold">{subtitle}</h2>
                <div className="mt-4 h-1 w-12 bg-white rounded mx-auto"></div>
              </div>
            </div>
            
            {/* Partie droite (contenu) */}
            <div className="p-8 md:p-10 md:col-span-3">
              {/* Version mobile du titre avec icône et rôle */}
              <div className="flex flex-col items-center md:hidden mb-6">
                {icon}
                <h2 className="text-orange-500 text-xl font-bold">{subtitle}</h2>
                <div className="mt-2 h-1 w-12 bg-orange-500 rounded"></div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center md:text-left">
                {title}
              </h1>
              
              <p className="text-gray-600 mt-4 leading-relaxed text-center md:text-left">
                {description}
              </p>
              
              {/* Call to action */}
              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  to={link}
                  className="group flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Indicateur de statut */}
              <div className="mt-8 text-center md:text-left">
                <div className="inline-flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <span>Système opérationnel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;