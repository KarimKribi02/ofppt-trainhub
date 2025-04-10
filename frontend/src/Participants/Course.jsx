import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AccessLetterPDF from './AccessLetterPDF';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

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
      });
    }
  }, []);
    
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/formations/${id}`)
      .then(res => {
        setFormation(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors de la récupération de la formation:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
        <div className="pt-20 flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Chargement de la formation...</p>
          </div>
        </div>
      </>
    );
  }

  if (!formation) {
    return (
      <>
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
        <div className="pt-20 flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <svg className="w-20 h-20 mx-auto text-red-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Formation introuvable</h2>
            <p className="text-gray-600">Nous n'avons pas pu trouver la formation que vous recherchez.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-t-2xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 relative">{formation.titre}</h1>
            <p className="text-orange-100 mb-6 max-w-2xl relative">{formation.description}</p>
            
            <div className="flex items-center space-x-4 text-sm relative">
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
            </div>

            <div className="absolute bottom-3 right-3 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg px-3 py-1 text-xs">
              Référence: #{formation.id}
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="bg-white border-b border-gray-200 rounded-b-none flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('details')} 
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition border-b-2 focus:outline-none ${
                activeTab === 'details' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Détails de la formation
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition border-b-2 focus:outline-none ${
                activeTab === 'resources' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ressources
            </button>
          </div>
          
          {/* Content */}
          <div className="bg-white rounded-b-2xl shadow-lg p-6 sm:p-8 border-t-0">
            {activeTab === 'details' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 relative">
                    <div className="absolute top-0 right-0 bg-orange-500 text-white rounded-bl-lg rounded-tr-lg px-3 py-1 text-xs font-medium">
                      Modalités
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Informations
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium">Filière:</span> {formation.filières}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div>
                          <span className="font-medium">Mode:</span> {formation.mode}
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-bl-lg rounded-tr-lg px-3 py-1 text-xs font-medium">
                      Équipe pédagogique
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      Formateurs
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      {formation.formateurs_animateurs.split(',').map((formateur, index) => (
                        <div key={index} className="flex items-center bg-white p-2 rounded-lg border border-blue-100">
                          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3 text-blue-700">
                            {formateur.trim().charAt(0)}
                          </div>
                          <div className="text-sm">{formateur.trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    À propos de cette formation
                  </h3>
                  <div className="prose max-w-none text-gray-700">
                    <p>{formation.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Téléchargements
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
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
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
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
                            </button>
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
                      <a
                        href={`http://127.0.0.1:8000/storage/formations/${formation.ressources}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <div className="bg-green-100 rounded-lg p-3 mr-4">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-800">Ressources pédagogiques</h4>
                          <p className="text-sm text-gray-500">Supports de cours, exercices, etc.</p>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Télécharger
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetailsPage;