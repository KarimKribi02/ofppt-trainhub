import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire ici
    console.log('Formulaire envoyé:', formData);
    // Réinitialiser le formulaire ou afficher un message de confirmation
  };


  return (
    <>
      <Navbar className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center" />
      <div className="bg-gradient-to-br from-orange-50 to-gray-50 min-h-screen relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* En-tête de contact avec animation subtile */}
          <div className="mb-16">
            <div className="overflow-hidden">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 transform hover:translate-x-2 transition-transform duration-300">
                Contactez-nous
              </h1>
            </div>
            <div className="w-24 h-1 bg-orange-500 mb-6"></div>
            <p className="text-gray-700 max-w-3xl text-lg mb-8 leading-relaxed">
              Vous avez des questions ? Nous sommes là pour vous aider. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {/* Informations de contact - 2 colonnes sur grand écran */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold mb-8 relative inline-block">
                Nos Coordonnées
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"></span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@skillbridge.com" className="text-gray-600 hover:text-orange-500 transition-colors">contact@skillbridge.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-gray-600 hover:text-orange-500 transition-colors">+33 1 23 45 67 89</a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Adresse</h3>
                    <p className="text-gray-600">123 Rue de l'Apprentissage, 75000 Paris, France</p>
                  </div>
                </div>
              </div>
              
              {/* Liens de réseaux sociaux */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  {/* Twitter */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a5.052 5.052 0 00-.665 2.5c0 1.683.869 3.184 2.164 4.053a4.878 4.878 0 01-2.217-.6v.06a4.923 4.923 0 003.946 4.827 5.003 5.003 0 01-2.212.085 4.921 4.921 0 004.6 3.42 9.87 9.87 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.209 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire de contact - 3 colonnes sur grand écran */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-8 relative inline-block">
                Envoyez-nous un message
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"></span>
              </h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 hover:bg-white transition-colors"
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 hover:bg-white transition-colors"
                      placeholder="jean@exemple.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 hover:bg-white transition-colors"
                    placeholder="Comment pouvons-nous vous aider ?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 hover:bg-white transition-colors"
                    placeholder="Votre message ici..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:ring-4 focus:ring-orange-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 font-medium text-lg"
                >
                  <span>Envoyer le message</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Section FAQ */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
            <h2 className="text-2xl font-bold mb-8 relative inline-block">
              Foire Aux Questions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Dans quel délai répondez-vous aux demandes ?</h3>
                <p className="text-gray-600">Nous nous efforçons de répondre à toutes les demandes dans les 24 heures pendant les jours ouvrables.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Quels sont vos horaires d'ouverture ?</h3>
                <p className="text-gray-600">Notre équipe est disponible du lundi au vendredi, de 9h00 à 18h00.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Puis-je planifier un appel avec votre équipe ?</h3>
                <p className="text-gray-600">Oui ! Veuillez remplir le formulaire de contact et préciser que vous souhaitez planifier un appel.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <h3 className="font-semibold text-lg mb-2">Proposez-vous un support technique ?</h3>
                <p className="text-gray-600">Oui, notre équipe d'assistance dédiée est prête à vous aider pour tout problème technique.</p>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;