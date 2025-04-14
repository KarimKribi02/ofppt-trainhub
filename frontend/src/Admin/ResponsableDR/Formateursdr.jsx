import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Formateursdr = () => {
  const [participants, setParticipants] = useState([]);
  const [animateurs, setAnimateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'participants', 'animateurs'
  const [filiereFilter, setFiliereFilter] = useState(''); // Empty string for no filter

  const fetchData = async () => {
    setLoading(true);
    try {
      const [participantsResponse, animateursResponse] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/participants'),
        axios.get('http://127.0.0.1:8000/api/animateurs'),
      ]);
      console.log('Participants API Response:', participantsResponse.data);
      console.log('Animateurs API Response:', animateursResponse.data);
      setParticipants(Array.isArray(participantsResponse.data) ? participantsResponse.data : []);
      setAnimateurs(Array.isArray(animateursResponse.data) ? animateursResponse.data : []);
      setError(null);
    } catch (err) {
      console.error('Error:', err.response || err.message);
      setError('Erreur lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Available filières for filter (based on your previous form options)
  const filieres = [
    'Développement Digital',
    'Génie Civil',
    'Infrastructure Digitale',
    'Gestion des Entreprises',
  ];

  // Filter data based on role and filière
  const filteredParticipants = participants.filter((participant) =>
    filiereFilter ? participant.filliere === filiereFilter : true
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="bg-orange-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 p-4 sm:ml-64">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <motion.div
            className="flex-1 min-w-0"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold leading-7 text-orange-900 sm:text-3xl sm:leading-9 sm:truncate">
              Gestion des Participants et Animateurs
            </h2>
            <p className="mt-1 text-sm text-orange-700">
              Consultez tous vos participants et animateurs en un seul endroit
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="mb-8 bg-white shadow-lg rounded-lg p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700">
                Filtrer par rôle
              </label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="all">Tous</option>
                <option value="participants">Participants</option>
                <option value="animateurs">Animateurs</option>
              </select>
            </div>
            <div>
              <label htmlFor="filiereFilter" className="block text-sm font-medium text-gray-700">
                Filtrer par filière (Participants)
              </label>
              <select
                id="filiereFilter"
                value={filiereFilter}
                onChange={(e) => setFiliereFilter(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option value="">Toutes</option>
                {filieres.map((filiere) => (
                  <option key={filiere} value={filiere}>
                    {filiere}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Participants Table */}
        {(roleFilter === 'all' || roleFilter === 'participants') && (
          <motion.div
            className="flex flex-col mb-12"
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
                        <svg
                          className="animate-spin h-8 w-8 text-orange-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Chargement des données...</p>
                    </div>
                  ) : filteredParticipants.length === 0 ? (
                    <div className="bg-white px-4 py-12 text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-orange-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun participant</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Aucun participant ne correspond aux critères.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3">
                        <h3 className="text-lg font-medium text-white">Liste des Participants</h3>
                      </div>
                      <table className="min-w-full divide-y divide-orange-100">
                        <thead className="bg-orange-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Nom
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Prénom
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Adresse e-mail
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Filière
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Établissement
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-orange-100">
                          {filteredParticipants.map((participant) => (
                            <motion.tr
                              key={participant.id}
                              variants={itemVariants}
                              whileHover={{ backgroundColor: '#fff7ed' }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{participant.id}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{participant.nom}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{participant.prenom}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {participant.email}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{participant.filliere || 'Non spécifié'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{participant.etablissement || 'Non spécifié'}</div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Animateurs Table */}
        {(roleFilter === 'all' || roleFilter === 'animateurs') && (
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
                        <svg
                          className="animate-spin h-8 w-8 text-orange-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Chargement des données...</p>
                    </div>
                  ) : animateurs.length === 0 ? (
                    <div className="bg-white px-4 py-12 text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-orange-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun animateur</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Aucun animateur ne correspond aux critères.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3">
                        <h3 className="text-lg font-medium text-white">Liste des Animateurs</h3>
                      </div>
                      <table className="min-w-full divide-y divide-orange-100">
                        <thead className="bg-orange-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Nom
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Prénom
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                            >
                              Adresse e-mail
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-orange-100">
                          {animateurs.map((animateur) => (
                            <motion.tr
                              key={animateur.id}
                              variants={itemVariants}
                              whileHover={{ backgroundColor: '#fff7ed' }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{animateur.id}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{animateur.nom}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{animateur.prenom}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {animateur.email}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Formateursdr;