import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutPage = () => {
  const objectifs = [
    {
      id: 1,
      icon: "📅",
      title: "Planification des formations",
      description: "Permettre une planification efficace des sessions de formation pour les formateurs de l'OFPPT."
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
      description: "Faciliter l'accès aux ressources pédagogiques à travers un système d'archivage centralisé."
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
      description: "Génération de statistiques détaillées pour faciliter la prise de décision et l'amélioration continue."
    },
    {
      id: 4,
      icon: "🧩",
      title: "Solution intégrée",
      description: "Regrouper tous les modules nécessaires dans une plateforme centralisée et performante."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À propos du Trainhub</h1>
            <div className="w-16 h-1 bg-white rounded mb-6"></div>
            <p className="text-lg md:text-xl text-orange-100">
              Un système moderne pour l'excellence dans la formation professionnelle.
            </p>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="h-16 bg-gradient-to-br from-orange-500 to-orange-600 relative">
          <svg className="absolute bottom-0 w-full h-16 text-gray-50 transform translate-y-1" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.16,105.91,165.81,121.41,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Mission Section */}
          <div className="mb-16 max-w-4xl mx-auto text-center">
            <div className="inline-block p-2 bg-orange-100 text-orange-600 rounded-lg mb-4">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Notre Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ce système de gestion a été conçu pour renforcer l'efficacité des formations dispensées aux formateurs de l'OFPPT.
              Il permet une meilleure planification, un suivi rigoureux, une gestion centralisée des documents, et facilite l'organisation logistique. 
              En s'appuyant sur des outils modernes, le projet vise à améliorer la qualité pédagogique et la prise de décision au sein de l'établissement.
            </p>
          </div>
          
          {/* Objectives Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2">Nos Objectifs</span>
              <h2 className="text-3xl font-bold text-gray-800">Objectifs du système</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {objectifs.map((obj, index) => (
                <div key={obj.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border-b-4 border-transparent hover:border-orange-500">
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-2xl mr-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                        {obj.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{obj.title}</h3>
                    </div>
                    <p className="text-gray-600 flex-grow">{obj.description}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mb-20 relative overflow-hidden bg-orange-500 text-white rounded-2xl shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6">
                  <div className=" text-orange-600 text-3xl md:text-4xl font-bold mb-2">150+</div>
                  <div className="text-orange-600">Formations</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6">
                  <div className=" text-orange-600 text-3xl md:text-4xl font-bold mb-2">5000+</div>
                  <div className="text-orange-600">Formateurs</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6">
                  <div className=" text-orange-600 text-3xl md:text-4xl font-bold mb-2">98%</div>
                  <div className="text-orange-600">Satisfaction</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6">
                  <div className=" text-orange-600 text-3xl md:text-4xl font-bold mb-2">24/7</div>
                  <div className="text-orange-600">Support</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advantages Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2">Pourquoi nous choisir</span>
              <h2 className="text-3xl font-bold text-gray-800">Avantages clés</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {avantages.map((adv, index) => (
                <div key={adv.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex">
                  <div className="mr-5 flex-shrink-0">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl text-orange-600">
                      {adv.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{adv.title}</h3>
                    <p className="text-gray-600">{adv.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prêt à améliorer votre gestion de formation?</h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Rejoignez les milliers de formateurs qui utilisent déjà notre plateforme pour améliorer leur efficacité pédagogique.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-orange-600 font-medium py-3 px-6 rounded-lg hover:bg-orange-50 transition shadow-md">
                Demander une démo
              </button>
              <button className="bg-orange-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-800 transition shadow-md">
                Contacter l'équipe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;