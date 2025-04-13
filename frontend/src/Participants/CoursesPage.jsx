import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const StyledCourseCard = ({ formation, index }) => {
  const curriculum = [
    { title: "Lieu:", description: formation.lieux },
    { title: "Filière:", description: formation.filières },
    { title: "Formateurs:", description: formation.formateurs_animateurs },
    { title: "Mode de formation:", description: formation.mode },
  ];

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 // Stagger effect based on index
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  // Curriculum items animation
  const curriculumContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const curriculumItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: "#fff7ed", // Tailwind orange-50 darkened slightly
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  // Button animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      backgroundColor: "#ea580c", // Tailwind orange-600
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-orange-500"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <motion.h1 
          className="text-2xl font-bold text-orange-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {formation.titre}
        </motion.h1>
        <motion.p 
          className="text-gray-700 mb-2 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="font-medium">Description:</span> {formation.description}
        </motion.p>
        <motion.div 
          className="flex items-center space-x-2 text-sm text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.svg 
            className="w-4 h-4 text-orange-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </motion.svg>
          <span className="font-medium">Du</span> {formation.dateDebut} <span className="font-medium">au</span> {formation.dateFin}
        </motion.div>
      </div>
      
      <div className="px-6 pb-4">
        <motion.h3 
          className="text-lg font-bold text-gray-800 mb-4 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.svg 
            className="w-5 h-5 mr-2 text-orange-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </motion.svg>
          Programme
        </motion.h3>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          variants={curriculumContainer}
          initial="hidden"
          animate="visible"
        >
          {curriculum.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-orange-50 p-3 rounded-lg transition-colors"
              variants={curriculumItem}
              whileHover="hover"
            >
              <h2 className="text-orange-600 font-semibold text-sm mb-1 flex items-center">
                {item.title}
              </h2>
              <p className="text-sm text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-end">
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to={`/courses/${formation.id}`}
            className="bg-orange-500 text-white py-2 px-6 rounded-lg shadow-md transform flex items-center"
          >
            <span>Détails</span>
            <motion.svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CoursesPage = () => {
  const [user, setUser] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }).then(res => {
        setUser(res.data);
      }).catch(err => {
        console.error('Erreur utilisateur:', err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios.get('http://127.0.0.1:8000/api/formation-participants')
        .then(res => {
          const filtered = res.data.filter(fp => fp.participant_id === user.id);
          setUserCourses(filtered);
          setLoading(false);
        }).catch(err => {
          console.error('Erreur formations:', err);
          setLoading(false);
        });
    }
  }, [user]);

  // Page animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren" 
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  // Loading animation variants
  const loadingVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Empty state animation
  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gray-50"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4"
            variants={titleVariants}
          >
            <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
              <motion.span 
                className="text-orange-500 mr-2"
                animate={{ 
                  height: ["100%", "60%", "100%"],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                |
              </motion.span>
              Mes Formations
            </h1>
            <motion.div 
              className="hidden md:flex items-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.svg 
                className="w-5 h-5 mr-1 text-orange-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </motion.svg>
              <span>Dernière mise à jour: {new Date().toLocaleDateString()}</span>
            </motion.div>
          </motion.div>

          {loading ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"
                variants={loadingVariants}
                animate="animate"
              ></motion.div>
              <motion.p 
                className="mt-4 text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Chargement de vos formations...
              </motion.p>
            </motion.div>
          ) : userCourses.length === 0 ? (
            <motion.div 
              className="bg-white rounded-xl shadow-md p-10 text-center"
              variants={emptyStateVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.svg 
                className="w-20 h-20 mx-auto text-orange-300" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </motion.svg>
              <motion.h2 
                className="text-2xl font-bold text-gray-700 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Aucune formation trouvée
              </motion.h2>
              <motion.p 
                className="text-gray-500 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Vous n'êtes inscrit à aucune formation pour le moment.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {userCourses.map((item, index) => (
                <StyledCourseCard key={index} formation={item.formation} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default CoursesPage;