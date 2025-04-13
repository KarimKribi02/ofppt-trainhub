import React from 'react';
import { motion } from 'framer-motion';
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -10,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.1, transition: { duration: 0.2, yoyo: Infinity, repeatDelay: 0.5 } }
  };

  const statsCounterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      
      {/* Hero Section with Animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white"
      >
        <div className="container mx-auto px-4 py-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"
          ></motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="relative z-10 max-w-3xl"
          >
            <motion.h1 
              variants={fadeInRight}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >À propos du Trainhub</motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-white rounded mb-6"
            ></motion.div>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-orange-100"
            >
              Un système moderne pour l'excellence dans la formation professionnelle.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Wave Divider */}
        <div className="h-16 bg-gradient-to-br from-orange-500 to-orange-600 relative">
          <svg className="absolute bottom-0 w-full h-16 text-gray-50 transform translate-y-1" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.16,105.91,165.81,121.41,321.39,56.44Z"></path>
          </svg>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Mission Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-16 max-w-4xl mx-auto text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block p-2 bg-orange-100 text-orange-600 rounded-lg mb-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
            >Notre Mission</motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed"
            >
              Ce système de gestion a été conçu pour renforcer l'efficacité des formations dispensées aux formateurs de l'OFPPT.
              Il permet une meilleure planification, un suivi rigoureux, une gestion centralisée des documents, et facilite l'organisation logistique. 
              En s'appuyant sur des outils modernes, le projet vise à améliorer la qualité pédagogique et la prise de décision au sein de l'établissement.
            </motion.p>
          </motion.div>
          
          {/* Objectives Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2"
              >Nos Objectifs</motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-800"
              >Objectifs du système</motion.h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {objectifs.map((obj) => (
                <motion.div 
                  key={obj.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border-b-4 border-transparent hover:border-orange-500"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex items-center">
                      <motion.div 
                        variants={iconVariants}
                        whileHover="hover"
                        className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-2xl mr-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300"
                      >
                        {obj.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800">{obj.title}</h3>
                    </div>
                    <p className="text-gray-600 flex-grow">{obj.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mb-20 relative overflow-hidden bg-orange-500 text-white rounded-2xl shadow-xl"
          >
            {/* Background Pattern */}
            <motion.div 
              animate={{ 
                x: [0, 10, 0],
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 opacity-10"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </motion.div>
            
            <div className="relative z-10 p-8 md:p-12">
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
              >
                {[
                  { value: "150+", label: "Formations" },
                  { value: "5000+", label: "Formateurs" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={statsCounterVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-6"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.8,
                        delay: 0.1 + index * 0.1,
                        type: "spring"
                      }}
                      className="text-orange-600 text-3xl md:text-4xl font-bold mb-2"
                    >{stat.value}</motion.div>
                    <div className="text-orange-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Advantages Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2"
              >Pourquoi nous choisir</motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-800"
              >Avantages clés</motion.h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {avantages.map((adv) => (
                <motion.div 
                  key={adv.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex"
                >
                  <motion.div 
                    variants={iconVariants}
                    whileHover="hover" 
                    className="mr-5 flex-shrink-0"
                  >
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl text-orange-600">
                      {adv.icon}
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{adv.title}</h3>
                    <p className="text-gray-600">{adv.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >Prêt à améliorer votre gestion de formation?</motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-orange-100 mb-8 max-w-2xl mx-auto"
            >
              Rejoignez les milliers de formateurs qui utilisent déjà notre plateforme pour améliorer leur efficacité pédagogique.
            </motion.p>
            <motion.div 
              variants={staggerContainer}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button 
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 font-medium py-3 px-6 rounded-lg hover:bg-orange-50 transition shadow-md"
              >
                Demander une démo
              </motion.button>
              <motion.button 
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-800 transition shadow-md"
              >
                Contacter l'équipe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;