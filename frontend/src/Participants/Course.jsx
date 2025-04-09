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
  console.log(user);
  

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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-10 border border-gray-200">
          
          {/* Header / Titre */}
          <div className="mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-orange-600 mb-2">{formation.titre}</h1>
            <p className="text-gray-500">Référence: #{formation.id}</p>
          </div>

          {/* Contenu de la formation comme un document */}
          <div className="space-y-4 text-gray-800 leading-relaxed text-lg">
            <p><strong>Description :</strong> {formation.description}</p>
            <p><strong>Lieu :</strong> {formation.lieux}</p>
            <p><strong>Filière :</strong> {formation.filières}</p>
            <p><strong>Dates :</strong> {formation.dateDebut} → {formation.dateFin}</p>
            <p><strong>Formateurs / Animateurs :</strong> {formation.formateurs_animateurs}</p>
            <p><strong>Mode de formation :</strong> {formation.mode}</p>
          </div>

          {/* Boutons de téléchargement */}
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


            <a
              href={`http://127.0.0.1:8000/storage/formations/${formation.ressources}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition text-center"
            >
              📁 Télécharger les ressources de la formation
            </a>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetailsPage;
