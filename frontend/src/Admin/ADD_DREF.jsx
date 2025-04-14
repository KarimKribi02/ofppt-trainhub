import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const GestionDREF = () => {
  // État pour la gestion des données DREF
  const [drefs, setdrefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });
  
  // État pour la visibilité du formulaire
  const [showForm, setShowForm] = useState(false);
  
  // Fonction pour récupérer les drefs depuis l'API
  const fetchdrefs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/drefUsers');
      setdrefs(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des drefs. Veuillez réessayer.');
      console.error('Erreur de récupération des drefs:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Charger les drefs au montage du composant
  useEffect(() => {
    fetchdrefs();
  }, []);
  
  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://127.0.0.1:8000/api/drefUsers', formData);
      // Réinitialiser le formulaire
      setFormData({
        email: '',
        role: '',
        password: '',
      });
      // Fermer le formulaire
      setShowForm(false);
      // Rafraîchir la liste des drefs
      fetchdrefs();

      // Afficher une notification de succès
      alert('DREF ajouté avec succès !');
    } catch (err) {
      setError('Erreur lors de l\'ajout du DREF. Veuillez réessayer.');
      console.error('Erreur d\'ajout du DREF:', err);
    }
  };

  // Gérer la suppression d'un DREF
  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce DREF ?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/drefsUsers/${id}`);
        fetchdrefs(); // rafraîchir la liste
      } catch (err) {
        console.error('Erreur lors de la suppression du DREF:', err);
        setError('Erreur lors de la suppression du DREF.');
      }
    }
  };
  
  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 p-4 sm:ml-64">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* En-tête */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <motion.div 
            className="flex-1 min-w-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold leading-7 text-orange-900 sm:text-3xl sm:leading-9 sm:truncate">
              Gestion des Cahiers des Charges
            </h2>
            <p className="mt-1 text-sm text-orange-700">
              Créez et gérez tous vos cahiers des charges en un seul endroit
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-4 flex md:mt-0 md:ml-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {showForm ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                )}
              </svg>
              {showForm ? 'Annuler' : 'Nouveau DREF'}
            </motion.button>
          </motion.div>
        </div>
        
        {/* Formulaire pour ajouter un nouveau DREF */}
        {showForm && (
          <motion.div 
            className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-4">
              <h3 className="text-lg font-medium text-white">
                Ajouter un nouveau Cahier des Charges
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse e-mail
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder="exemple@domaine.com"
                      />
                    </div>
                  </div>
                  
                  
                  
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-orange-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {/* Afficher l'erreur si présente */}
        {error && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Tableau DREF */}
        <motion.div 
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg rounded-lg overflow-hidden border border-orange-100">
                {loading ? (
                  <div className="bg-white px-4 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Chargement des cahiers des charges...</p>
                  </div>
                ) : !drefs.data || drefs.data.length === 0 ? (
                  <div className="bg-white px-4 py-12 text-center">
                    <svg className="mx-auto h-16 w-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun cahier des charges</h3>
                    <p className="mt-1 text-sm text-gray-500">Commencez par ajouter un nouveau cahier des charges.</p>
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Créer un DREF
                    </motion.button>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3">
                      <h3 className="text-lg font-medium text-white">Liste des Cahiers des Charges</h3>
                    </div>
                    <table className="min-w-full divide-y divide-orange-100">
                      <thead className="bg-orange-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                            Adresse e-mail
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                            Rôle
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-orange-100">
                        {drefs.data.map((DREF, index) => (
                          <motion.tr 
                            key={DREF.id || index}
                            variants={itemVariants}
                            whileHover={{ backgroundColor: '#fff7ed' }} // hover orange-50
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{DREF.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 truncate max-w-xs">{DREF.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                DREF.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : DREF.role === 'editor' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {DREF.role === 'admin' 
                                  ? 'Administrateur' 
                                  : DREF.role === 'editor' 
                                    ? 'Éditeur' 
                                    : DREF.role || 'Lecteur'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                
                                <motion.button 
                                  onClick={() => handleDelete(DREF.id)} 
                                  className="text-red-600 hover:text-red-800 transition-colors flex items-center"
                                  title="Supprimer"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                      className="h-5 w-5" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor">
                                    <path strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth={2} 
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-3h4m-4 0a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1m-4 0h4" />
                                  </svg>
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-orange-50 px-4 py-3 border-t border-orange-100 flex items-center justify-between">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <a href="#" className="relative inline-flex items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-orange-700 bg-white hover:bg-orange-50">
                          Précédent
                        </a>
                        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-orange-700 bg-white hover:bg-orange-50">
                          Suivant
                        </a>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-orange-700">
                            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{drefs.data.length}</span> sur <span className="font-medium">{drefs.data.length}</span> résultats
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-orange-300 bg-white text-sm font-medium text-orange-500 hover:bg-orange-50">
                              <span className="sr-only">Précédent</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </a>
                            <a href="#" aria-current="page" className="z-10 bg-orange-50 border-orange-500 text-orange-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                              1
                            </a>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-orange-300 bg-white text-sm font-medium text-orange-500 hover:bg-orange-50">
                              <span className="sr-only">Suivant</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </a>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GestionDREF;