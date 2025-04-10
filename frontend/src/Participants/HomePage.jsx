import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Benefits = () => {
  const [user, setUser] = useState(null);
  const [cours, setCours] = useState([]);
  const [coursFiltrés, setCoursFiltrés] = useState([]);
  const [authCheck, setAuthCheck] = useState(0); // Clé pour forcer la vérification

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      })
        .then(() => {
          localStorage.removeItem('token');
          setUser(null);
          setCoursFiltrés([]); // Réinitialise les cours
          setAuthCheck(prev => prev + 1); // Force une nouvelle vérification
          console.log('Déconnexion réussie');
        })
        .catch(err => {
          console.error('Erreur déconnexion:', err.response ? err.response.data : err.message);
          localStorage.removeItem('token');
          setUser(null);
          setCoursFiltrés([]);
          setAuthCheck(prev => prev + 1);
        });
    } else {
      setUser(null);
      setCoursFiltrés([]);
      setAuthCheck(prev => prev + 1);
    }
  };

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      console.log('Vérification token:', token);
      if (token) {
        axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        })
          .then(res => {
            console.log('Utilisateur chargé:', res.data);
            setUser(res.data);
          })
          .catch(err => {
            console.error('Erreur utilisateur:', err.response ? err.response.data : err.message);
            setUser(null);
            localStorage.removeItem('token');
          });
      } else {
        console.log('Aucun token, user réinitialisé');
        setUser(null);
      }
    };

    fetchUser();
  }, [authCheck]); // Dépendance sur authCheck pour re-vérifier après logout

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/formation-participants')
      .then(res => {
        console.log('Cours chargés:', res.data);
        setCours(res.data);
      })
      .catch(err => {
        console.error('Erreur cours:', err);
      });
  }, []);

  useEffect(() => {
    if (user && cours.length > 0) {
      const filtrés = cours.filter(c => c.participant_id === user.id);
      console.log('Cours filtrés:', filtrés);
      setCoursFiltrés(filtrés);
    } else {
      setCoursFiltrés([]);
      console.log('Pas d’utilisateur ou pas de cours, coursFiltrés réinitialisé');
    }
  }, [user, cours]);

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue {user ? (
              <span className="text-orange-500">{user.nom} {user.prenom}</span>
            ) : (
              'sur Trainhub'
            )}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
          Découvrez notre plateforme dédiée à la gestion et au suivi des formations des formateurs de Trainhub.
          </p>
          <p className="text-gray-500 text-sm mb-8">
          Optimisez vos parcours, accédez aux ressources pédagogiques, et suivez votre évolution professionnelle en toute simplicité.
          </p>
          <Link to="/courses" className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow hover:bg-orange-600 transition">
          Explorer les formations
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bénéfices</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Découvrez les avantages uniques de notre plateforme d’apprentissage.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Contenu de qualité', description: 'Cours élaborés par des professionnels expérimentés.' },
              { icon: '💡', title: 'Apprentissage flexible', description: 'Étudiez à votre propre rythme, n’importe où, n’importe quand.' },
              { icon: '📈', title: 'Développement de carrière', description: 'Améliorez vos compétences pour booster votre carrière.' }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {user && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-800">Mes Formations</h2>
                <p className="text-gray-600 max-w-xl">
                  Voici les formations auxquelles vous êtes inscrit.
                </p>
              </div>
              <Link to="/courses" className="text-orange-500 hover:underline font-medium text-sm">
                Voir tous les cours →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursFiltrés.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200">
                  <h3 className="text-xl font-semibold text-orange-600 mb-2">{item.formation.titre}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">📍 Lieu :</span> {item.formation.lieux}</p>
                    <p><span className="font-medium">🎓 Filière :</span> {item.formation.filières}</p>
                    <p><span className="font-medium">🗓️ Dates :</span> {item.formation.dateDebut} → {item.formation.dateFin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Benefits;