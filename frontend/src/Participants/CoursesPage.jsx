import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const StyledCourseCard = ({ formation }) => {
  const curriculum = [
    { title: "Lieu:", description: formation.lieux },
    { title: "Filière:", description: formation.filières },
    // { title: "Date:", description: formation.dateDebut + " - " + formation.dateFin },
    { title: "formateurs_animateurs:", description: formation.formateurs_animateurs },
    { title: "mode de formation:", description: formation.mode },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-8 space-y-6 border border-gray-100 hover:shadow-lg transition">
      <div>
        <h1 className="text-2xl font-bold text-orange-600 mb-1">{formation.titre}</h1>
        <p className="text-gray-600 mb-1"><strong>description:</strong> {formation.description}</p>
        {/* <p className="text-gray-600 mb-1"><strong>Filière:</strong> {formation.filières}</p> */}
        <p className="text-gray-600 mb-4"><strong>Date:</strong> {formation.dateDebut} - {formation.dateFin}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Programme</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {curriculum.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              
              <h2 className="text-orange-500 font-bold text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4 text-right">
        <Link to={`/courses/${formation.titre.toLowerCase().replace(/ /g, '-')}`} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition">
          Détails
        </Link>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [user, setUser] = useState(null);
  const [userCourses, setUserCourses] = useState([]);

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
    if (user) {
      axios.get('http://127.0.0.1:8000/api/formation-participants')
        .then(res => {
          const filtered = res.data.filter(fp => fp.participant_id === user.id);
          setUserCourses(filtered);
        }).catch(err => {
          console.error('Erreur formations:', err);
        });
    }
  }, [user]);

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Mes Formations
        </h1>

        {userCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune formation trouvée.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {userCourses.map((item, index) => (
              <StyledCourseCard key={index} formation={item.formation} />
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CoursesPage;
