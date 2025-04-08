import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Benefits = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Appel à l'API Laravel pour récupérer l'utilisateur connecté
    axios.get('http://127.0.0.1:8000/api/login')
      .then(res => setUser(res.data))
      .catch(() => setUser(null)); // utilisateur invité
  }, []);

  return (
    <>
    <Navbar />
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue {user ? <span className="text-orange-500">{user.name}</span> : 'sur notre plateforme'}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Découvrez nos cours en ligne en design et développement.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Apprenez avec des experts du domaine et développez vos compétences à votre rythme.
          </p>
          <Link to="/courses" className="bg-orange-500 text-white py-3 px-6 rounded-lg shadow hover:bg-orange-600 transition">
            Explorer les cours
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bénéfices</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Découvrez les avantages uniques de notre plateforme d’apprentissage.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Contenu de qualité',
                description: 'Cours élaborés par des professionnels expérimentés.'
              },
              {
                icon: '💡',
                title: 'Apprentissage flexible',
                description: 'Étudiez à votre propre rythme, n’importe où, n’importe quand.'
              },
              {
                icon: '📈',
                title: 'Développement de carrière',
                description: 'Améliorez vos compétences pour booster votre carrière.'
              }
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

      {/* Courses Section (seulement si utilisateur connecté) */}
      {user && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Nos Cours</h2>
                <p className="text-gray-600 max-w-2xl">
                  Découvrez notre sélection de cours de haute qualité.
                </p>
              </div>
              <Link to="/courses" className="text-orange-500 hover:underline font-medium">
                Voir tous les cours
              </Link>
            </div>
            {/* Tu peux ajouter ici une boucle pour afficher les cours */}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Benefits;
