import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const StyledCourseCard = ({ formation }) => {
  const curriculum = [
    { title: "Lieu:", description: formation.lieux },
    { title: "Filière:", description: formation.filières },
    { title: "Formateurs:", description: formation.formateurs_animateurs },
    { title: "Mode de formation:", description: formation.mode },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-orange-500">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">{formation.titre}</h1>
        <p className="text-gray-700 mb-2 line-clamp-2"><span className="font-medium">Description:</span> {formation.description}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Du</span> {formation.dateDebut} <span className="font-medium">au</span> {formation.dateFin}
        </div>
      </div>
      
      <div className="px-6 pb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          Programme
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {curriculum.map((item, index) => (
            <div key={index} className="bg-orange-50 p-3 rounded-lg hover:bg-orange-100 transition-colors group">
              <h2 className="text-orange-600 font-semibold text-sm mb-1 flex items-center">
                {item.title}
              </h2>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 flex justify-end">
        <Link
          to={`/courses/${formation.id}`}
          className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <span>Détails</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" />
      
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
              <span className="text-orange-500 mr-2">|</span>
              Mes Formations
            </h1>
            <div className="hidden md:flex items-center text-sm text-gray-500">
              <svg className="w-5 h-5 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Dernière mise à jour: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement de vos formations...</p>
            </div>
          ) : userCourses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
              <svg className="w-20 h-20 mx-auto text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mt-4">Aucune formation trouvée</h2>
              <p className="text-gray-500 mt-2">Vous n'êtes inscrit à aucune formation pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userCourses.map((item, index) => (
                <StyledCourseCard key={index} formation={item.formation} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;