import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Navbar from './Navbar';

const Benefits = () => {
  const [user, setUser] = useState(null);
  const [cours, setCours] = useState([]);
  const [coursFiltrés, setCoursFiltrés] = useState([]);
  const [authCheck, setAuthCheck] = useState(0);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
        .then(() => {
          localStorage.removeItem('token');
          setUser(null);
          setCoursFiltrés([]);
          setAuthCheck(prev => prev + 1);
          console.log('Déconnexion réussie');
        })
        .catch(err => {
          console.error('Erreur déconnexion:', err.response ? err.response.data : err.message);
          localStorage.removeItem('token');
          setUser(null);
          setCoursFiltrés([]);
          setAuthCheck(prev => prev + 1);
        });
    } else {
      setUser(null);
      setCoursFiltrés([]);
      setAuthCheck(prev => prev + 1);
    }
  };

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      console.log('Vérification token:', token);
      if (token) {
        axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        })
          .then(res => {
            console.log('Utilisateur chargé:', res.data);
            setUser(res.data);
          })
          .catch(err => {
            console.error('Erreur utilisateur:', err.response ? err.response.data : err.message);
            setUser(null);
            localStorage.removeItem('token');
          });
      } else {
        console.log('Aucun token, user réinitialisé');
        setUser(null);
      }
    };

    fetchUser();
  }, [authCheck]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/formation-participants')
      .then(res => {
        console.log('Cours chargés:', res.data);
        setCours(res.data);
      })
      .catch(err => {
        console.error('Erreur cours:', err);
      });
  }, []);

  useEffect(() => {
    if (user && cours.length > 0) {
      // Filter courses to include only those with "statut": "validé" and matching participant_id
      const filtrés = cours.filter(
        c => c.participant_id === user.id && c.formation.statut === "validé"
      );
      console.log('Cours filtrés:', filtrés);
      setCoursFiltrés(filtrés);
    } else {
      setCoursFiltrés([]);
      console.log('Pas d utilisateur ou pas de cours, coursFiltrés réinitialisé');
    }
  }, [user, cours]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: "#f97316",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5 
      }
    },
    hover: { 
      scale: 1.1,
      backgroundColor: "#f97316",
      color: "#ffffff",
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <>
      <Navbar className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center" handleLogout={handleLogout} />
      
      {/* Section Hero avec fond créatif et animation */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-cover bg-center py-16 md:py-24 text-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='400' cy='400' r='600'/%3E%3Ccircle cx='1200' cy='200' r='400'/%3E%3Ccircle cx='800' cy='600' r='300'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right, #ffffff, #fef3e8)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900"
          >
            {user ? (
              <span>Bienvenue, <span className="text-orange-500 underline decoration-orange-500/50">{user.nom} {user.prenom}</span></span>
            ) : (
              'Découvrez Trainhub'
            )}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8"
          >
            Votre porte d'entrée vers une croissance professionnelle avec des solutions de formation adaptées.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/courses"
              className="inline-block bg-orange-500 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-full font-semibold shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300"
            >
              Explorer les Formations
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Éléments décoratifs animés */}
        <div className="absolute w-full h-full z-0">
          <motion.svg 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute right-0 top-0 h-64 w-64 text-orange-200 opacity-20 transform translate-x-1/3 -translate-y-1/4" 
            fill="currentColor" 
            viewBox="0 0 100 100"
          >
            <path d="M50 0 L100 50 L50 100 L0 50 Z"></path>
          </motion.svg>
          <motion.svg 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.2, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 bottom-0 h-48 w-48 text-orange-300 opacity-20 transform -translate-x-1/3 translate-y-1/4" 
            fill="currentColor" 
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50"></circle>
          </motion.svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10 md:mb-12">
              Pourquoi choisir Trainhub ?
            </h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {[
              { 
                icon: '🎯', 
                title: 'Expertise reconnue', 
                description: 'Formations dispensées par des experts de l\'industrie avec une expérience concrète et reconnue.' 
              },
              { 
                icon: '⚡', 
                title: 'Flexibilité maximale', 
                description: 'Apprenez à votre rythme, où que vous soyez, quand vous le souhaitez, sur tous vos appareils.' 
              },
              { 
                icon: '🚀', 
                title: 'Évolution de carrière', 
                description: 'Déverrouillez de nouvelles opportunités professionnelles grâce à des compétences prisées sur le marché.' 
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-2xl shadow-xl p-8 border-b-4 border-transparent"
              >
                <motion.div 
                  variants={iconVariants}
                  whileHover="hover"
                  className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-3xl mb-6"
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Mes Formations (pour les utilisateurs connectés) avec animation */}
      {user && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white py-12 md:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">Mes Formations</h2>
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/courses"
                  className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  Voir tout <span className="text-sm">→</span>
                </Link>
              </motion.div>
            </motion.div>
            
            {coursFiltrés.length > 0 ? (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {coursFiltrés.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="relative bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-lg overflow-hidden"
                  >
                    {/* Élément décoratif créatif */}
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                      className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -translate-y-12 translate-x-12"
                    ></motion.div>
                    <h3 className="text-lg md:text-xl font-semibold text-orange-600 mb-4 relative z-10">{item.formation.titre}</h3>
                    <div className="text-gray-600 space-y-3 text-sm md:text-base relative z-10">
                      <p className="flex items-center gap-2">
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                          className="text-orange-500"
                        >
                          📍
                        </motion.span>
                        <span className="font-medium text-gray-800">Lieu :</span> {item.formation.lieux}
                      </p>
                      <p className="flex items-center gap-2">
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.2 }}
                          className="text-orange-500"
                        >
                          🎓
                        </motion.span>
                        <span className="font-medium text-gray-800">Filière :</span> {item.formation.filières}
                      </p>
                      <p className="flex items-center gap-2">
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.4 }}
                          className="text-orange-500"
                        >
                          🗓️
                        </motion.span>
                        <span className="font-medium text-gray-800">Dates :</span> {item.formation.dateDebut} - {item.formation.dateFin}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center text-gray-500 py-10 md:py-12"
              >
                <p className="text-lg md:text-xl mb-4">Vous n'êtes inscrit à aucune formation validée pour le moment.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/courses"
                    className="inline-block text-orange-500 hover:text-orange-600 font-medium underline transition-colors duration-200"
                  >
                    Parcourir les formations disponibles
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      <Footer />
    </>
  );
};

export default Benefits;