import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutPage = () => {
  const objectifs = [
    {
      id: 1,
      icon: "📅",
      title: "Planification des formations",
      description: "Permettre une planification efficace des sessions de formation pour les formateurs de l’OFPPT."
    },
    {
      id: 2,
      icon: "📈",
      title: "Suivi et évaluation",
      description: "Assurer un suivi continu des parcours de formation et une évaluation de leur impact."
    },
    {
      id: 3,
      icon: "📂",
      title: "Centralisation documentaire",
      description: "Faciliter l’accès aux ressources pédagogiques à travers un système d’archivage centralisé."
    },
    {
      id: 4,
      icon: "🏨",
      title: "Organisation logistique",
      description: "Gérer les hébergements et déplacements des formateurs lors des sessions de formation."
    }
  ];

  const avantages = [
    {
      id: 1,
      icon: "🔐",
      title: "Sécurité & Accessibilité",
      description: "Une interface intuitive, responsive et sécurisée pour tous les profils utilisateurs."
    },
    {
      id: 2,
      icon: "👥",
      title: "Gestion multi-acteurs",
      description: "Un système adapté aux rôles des formateurs, responsables, administrateurs et animateurs."
    },
    {
      id: 3,
      icon: "📊",
      title: "Rapports analytiques",
      description: "Génération de statistiques détaillées pour faciliter la prise de décision et l’amélioration continue."
    },
    {
      id: 4,
      icon: "🧩",
      title: "Solution intégrée",
      description: "Regrouper tous les modules nécessaires dans une plateforme centralisée et performante."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">

          <h1 className="text-3xl font-bold mb-6">À propos du projet OFPPT</h1>
          <p className="text-gray-600 mb-12 max-w-4xl">
            Ce système de gestion a été conçu pour renforcer l'efficacité des formations dispensées aux formateurs de l'OFPPT.
            Il permet une meilleure planification, un suivi rigoureux, une gestion centralisée des documents, et facilite l'organisation logistique. 
            En s’appuyant sur des outils modernes, le projet vise à améliorer la qualité pédagogique et la prise de décision au sein de l’établissement.
          </p>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Objectifs du système</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {objectifs.map(obj => (
                <div key={obj.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{obj.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{obj.title}</h3>
                      <p className="text-gray-600">{obj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Avantages clés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {avantages.map(adv => (
                <div key={adv.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{adv.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{adv.title}</h3>
                      <p className="text-gray-600">{adv.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
