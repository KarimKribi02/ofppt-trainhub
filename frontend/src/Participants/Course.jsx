import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Navbar from './Navbar';
import Footer from './Footer';
import AccessLetterPDF from './AccessLetterPDF';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, when: 'beforeChildren', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Reusable Card Component
const Card = ({ children, bgColor, borderColor, badgeText, badgeColor }) => (
  <motion.div
    className={`p-6 rounded-xl border ${bgColor} ${borderColor} relative`}
    whileHover={{ scale: 1.02, boxShadow: `0 10px 25px rgba(0, 0, 0, 0.1)` }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {badgeText && (
      <div className={`absolute top-0 right-0 ${badgeColor} text-white rounded-bl-lg rounded-tr-lg px-3 py-1 text-xs font-medium`}>
        {badgeText}
      </div>
    )}
    {children}
  </motion.div>
);

// Hero Section Component
const HeroSection = ({ formation }) => (
  <motion.div
    className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-t-2xl p-8 text-white relative overflow-hidden shadow-lg"
    variants={itemVariants}
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
    
    <motion.h1
      className="text-3xl sm:text-4xl font-extrabold mb-3 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {formation.titre}
    </motion.h1>
    
    <motion.p
      className="text-orange-100 mb-6 max-w-2xl relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {formation.description}
    </motion.p>
    
    <motion.div
      className="flex items-center space-x-4 text-sm relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{formation.dateDebut} → {formation.dateFin}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{formation.lieux}</span>
      </div>
    </motion.div>
    
    <div className="absolute bottom-3 right-3 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg px-3 py-1 text-xs">
      Référence: #{formation.id}
    </div>
  </motion.div>
);

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => (
  <motion.div
    className="bg-white border-b border-gray-200 rounded-b-none flex overflow-x-auto"
    variants={itemVariants}
  >
    {['details', 'resources'].map((tab) => (
      <motion.button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition border-b-2 focus:outline-none ${
          activeTab === tab
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {tab === 'details' ? 'Détails de la formation' : 'Ressources'}
      </motion.button>
    ))}
  </motion.div>
);

// Modalités Section
const ModalitesSection = ({ formation }) => (
  <Card bgColor="bg-orange-50" borderColor="border-orange-100" badgeText="Modalités" badgeColor="bg-orange-500">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
      Informations
    </h3>
    <ul className="space-y-3 text-gray-700">
      {[
        { label: 'Filière', value: formation.filières, delay: 0.2 },
        { label: 'Mode', value: formation.mode, delay: 0.3 },
      ].map(({ label, value, delay }) => (
        <motion.li
          key={label}
          className="flex items-start"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay }}
        >
          <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="font-medium">{label}:</span> {value}
          </div>
        </motion.li>
      ))}
      {(formation.mode.toLowerCase() === 'hybride' || formation.mode.toLowerCase() === 'à_distance') && formation.lien_teams && (
        <motion.li
          className="flex items-start"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a7 7 0 00-7 7v4a7 7 0 007 7h4a7 7 0 007-7v-4a7 7 0 00-7-7h-4zm4.586 14a2 2 0 110-4 2 2 0 010 4zm2.121-8.121A3 3 0 0014 7a3 3 0 00-2.707 1.879l-.707.707A3 3 0 008 13a3 3 0 003 3h.586l.707-.707A3 3 0 0014 13a3 3 0 002.707-1.879l.707-.707A3 3 0 0017 7h-2.414z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="font-medium">Lien Teams:</span>{' '}
            <a
              href={formation.lien_teams}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-orange-500 hover:text-orange-600 font-medium "
            >
              Rejoindre la réunion
            </a>
          </div>
        </motion.li>
      )}
    </ul>
  </Card>
);

// Formateurs Section
const FormateursSection = ({ formateurs }) => (
  <Card bgColor="bg-blue-50" borderColor="border-blue-100" badgeText="Équipe pédagogique" badgeColor="bg-blue-500">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
      Formateurs
    </h3>
    <div className="space-y-2 text-gray-700">
      {formateurs.split(',').map((formateur, index) => (
        <motion.div
          key={index}
          className="flex items-center bg-white p-2 rounded-lg border border-blue-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3 text-blue-700">
            {formateur.trim().charAt(0)}
          </div>
          <div className="text-sm">{formateur.trim()}</div>
        </motion.div>
      ))}
    </div>
  </Card>
);

// À propos Section
const AboutSection = ({ description }) => (
  <Card bgColor="bg-gray-50" borderColor="border-gray-200">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      À propos de cette formation
    </h3>
    <div className="prose max-w-none text-gray-700">
      <p>{description}</p>
    </div>
  </Card>
);

// Download Section
const DownloadSection = ({ formation, user, handleDownload }) => (
  <motion.div
    className="p-6 bg-gray-50 rounded-xl border border-gray-200"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
      <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Téléchargements
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(79, 70, 229, 0.1)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PDFDownloadLink
          document={<AccessLetterPDF formation={formation} user={user} />}
          fileName={`Lettre_Demande_Formation_${formation.id}.pdf`}
          className="flex items-center"
        >
          {({ loading }) => (
            <>
              <div className="bg-indigo-100 rounded-lg p-3 mr-4">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M8 11a1 1 0 112 0v4a1 1 0 11-2 0v-4z" clipRule="evenodd" />
                  <path d="M6 10a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-gray-800">Lettre d'accès à la formation</h4>
                <p className="text-sm text-gray-500">Document officiel (PDF)</p>
              </div>
              <motion.button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                Télécharger
              </motion.button>
            </>
          )}
        </PDFDownloadLink>
      </motion.div>
      <motion.div
        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(22, 163, 74, 0.1)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center cursor-pointer" onClick={() => handleDownload(formation.document)}>
          <div className="bg-green-100 rounded-lg p-3 mr-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-gray-800">Ressources pédagogiques</h4>
            <p className="text-sm text-gray-500">Supports de cours, exercices, etc.</p>
          </div>
          <motion.button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Télécharger
          </motion.button>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error('Erreur utilisateur:', err));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/formations/${id}`)
      .then((res) => {
        setFormation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération de la formation:', err);
        setLoading(false);
      });
  }, [id]);

  const handleDownload = async (documentPath) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/downloadDocument/${documentPath}`, {
        responseType: 'arraybuffer',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentPath);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
        <div className="pt-20 flex items-center justify-center min-h-screen bg-gray-50">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Chargement de la formation...</p>
          </motion.div>
        </div>
      </>
    );
  }

  if (!formation) {
    return (
      <>
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
        <div className="pt-20 flex items-center justify-center min-h-screen bg-gray-50">
          <motion.div
            className="text-center p-8 bg-white rounded-lg shadow-md max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Formation introuvable</h2>
            <p className="text-gray-600">Nous n'avons pas pu trouver la formation que vous recherchez.</p>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 py-10">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <HeroSection formation={formation} />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <motion.div className="bg-white rounded-b-2xl shadow-lg p-6 sm:p-8 border-t-0" variants={itemVariants}>
            {activeTab === 'details' && (
              <motion.div className="space-y-8" variants={tabContentVariants} initial="hidden" animate="visible" key="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ModalitesSection formation={formation} />
                  <FormateursSection formateurs={formation.formateurs_animateurs} />
                </div>
                <AboutSection description={formation.description} />
              </motion.div>
            )}
            {activeTab === 'resources' && (
              <motion.div
                className="space-y-6"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                key="resources"
              >
                <DownloadSection formation={formation} user={user} handleDownload={handleDownload} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailsPage;