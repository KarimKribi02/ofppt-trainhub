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
    return <div className="text-center py-20 text-gray-500">Chargement...</div>;
  }

  if (!formation) {
    return <div className="text-center py-20 text-red-500">Formation introuvable.</div>;
  }

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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-10 border border-gray-200">
          <div className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">{formation.titre}</h1>
            <p className="text-gray-500">Référence: #{formation.id}</p>
          </div>

          <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
            <p><strong>Description :</strong> {formation.description}</p>
            <p><strong>Lieu :</strong> {formation.lieux}</p>
            <p><strong>Filière :</strong> {formation.filières}</p>
            <p><strong>Dates :</strong> {formation.dateDebut} → {formation.dateFin}</p>
            <p><strong>Formateurs / Animateurs :</strong> {formation.formateurs_animateurs}</p>
            <p><strong>Mode de formation :</strong> {formation.mode}</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <PDFDownloadLink
              document={<AccessLetterPDF formation={formation} user={user} />}
              fileName={`Lettre_Demande_Formation_${formation.id}.pdf`}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition text-center"
            >
              {({ loading }) =>
                loading
                  ? 'Génération en cours...'
                  : '📄 Télécharger la lettre d\'accès à la formation'
              }
            </PDFDownloadLink>

            {formation.document ? (
              <button
                onClick={() => handleDownload(formation.document)}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition text-center"
              >
                📁 Télécharger les ressources de la formation
              </button>
            ) : (
              <p className="text-gray-500 italic">Aucune ressource disponible pour cette formation</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetailsPage;