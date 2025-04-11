import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, User, Link2, Download, ArrowLeft, Clock } from 'lucide-react';

const AffichageFormation = () => {
  const [formationData, setFormationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchFormation();
  }, [id]);
    const handleDownload = async (documentPath) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/downloadDocument/${documentPath}`, {
          responseType: 'arraybuffer'
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

  const fetchFormation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/formations/${id}`);
      setFormationData(response.data);
    } catch (err) {
      console.error('Erreur lors de la récupération de la formation:', err);
      setFormationData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4">
        <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-md w-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>
          <div className="text-center relative z-10">
            <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 font-medium">Chargement en cours...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!formationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Formation non trouvée</h2>
            <p className="text-gray-600 mb-6">Nous n'avons pas pu trouver la formation que vous recherchez.</p>
            <Link
              to="/CDC/overview"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Retour à l'aperçu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4 sm:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec effet visuel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 transform transition hover:shadow-xl">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 opacity-90"></div>
            <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-sm">{formationData.titre}</h1>
              <p className="text-orange-100 text-lg italic leading-relaxed max-w-3xl">{formationData.description}</p>
            </div>
          </div>
          <div className="bg-orange-50 p-4 flex flex-wrap gap-4 justify-center sm:justify-start">
            <div className="flex items-center text-orange-700">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Du {formatDate(formationData.dateDebut)} au {formatDate(formationData.dateFin)}</span>
            </div>
            <div className="flex items-center text-orange-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{formationData.lieux}</span>
            </div>
            <div className="flex items-center text-orange-700">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formationData.mode}</span>
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Détails de la formation
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Filières</h3>
                <p className="mt-1 text-gray-800">{formationData.filières}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Formateurs / Animateurs</h3>
                <p className="mt-1 text-gray-800">{formationData.formateurs_animateurs}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Statut</h3>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    formationData.statut === 'En cours' ? 'bg-green-100 text-green-800' : 
                    formationData.statut === 'À venir' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {formationData.statut}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center">
              <Link2 className="w-5 h-5 mr-2" />
              Ressources
            </h2>
            <div className="space-y-4">
              {formationData.lien_teams && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Lien de réunion</h3>
                  <a
                    href={formationData.lien_teams}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-orange-500 hover:text-orange-600 font-medium flex items-center"
                  >
                    <Link2 className="w-4 h-4 mr-1" />
                    Rejoindre la réunion
                  </a>
                </div>
              )}
              
              {formationData.document && (
                <div className="flex items-center cursor-pointer" >
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800">Ressources pédagogiques</h4>
                  <p className="text-sm text-gray-500">Supports de cours, exercices, etc.</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center " onClick={() => handleDownload(formationData.document)}>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Télécharger
                </button>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de retour */}
        <div className="flex justify-center mb-8">
          <Link
            to="/CDC/overview"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Retour à l'aperçu des formations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AffichageFormation;