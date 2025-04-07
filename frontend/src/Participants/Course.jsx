import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LessonCard = ({ title, duration }) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <h3 className="text-gray-800">{title}</h3>
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 text-sm">{duration}</span>
      </div>
    </div>
  );
};

const CourseCard = ({ title, description, duration, level, rating, students }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600">{rating}</span>
          </div>
          <div className="text-gray-600 text-sm">
            {students} étudiants
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration}</span>
          </div>
          <Link 
            to={`/courses/${title.toLowerCase().replace(/ /g, '-')}`}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const courseContent = [
    {
      number: "01",
      title: "Introduction to UI/UX Design",
      lessons: [
        {
          title: "Understanding UI/UX Design Principles",
          duration: "45 Minutes"
        },
        {
          title: "Importance of User-Centered Design",
          duration: "1 Hour"
        },
        {
          title: "The Role of UI/UX Design in Product Development",
          duration: "45 Minutes"
        }
      ]
    },
    {
      number: "02",
      title: "User Research and Analysis",
      lessons: [
        {
          title: "Conducting User Research and Interviews",
          duration: "1 Hour"
        },
        {
          title: "Analyzing User Needs and Behavior",
          duration: "1 Hour"
        },
        {
          title: "Creating User Personas and Scenarios",
          duration: "45 Minutes"
        }
      ]
    }
  ];

  const courses = [
    {
      title: "UI/UX Design Course",
      description: "Apprenez à créer des interfaces utilisateur exceptionnelles et des expériences utilisateur intuitives.",
      duration: "12 semaines",
      level: "Débutant",
      rating: "4.8",
      students: "1,234"
    },
    {
      title: "Web Development",
      description: "Maîtrisez les technologies web modernes et créez des sites web réactifs.",
      duration: "16 semaines",
      level: "Intermédiaire",
      rating: "4.9",
      students: "2,156"
    },
    {
      title: "Digital Marketing",
      description: "Développez des stratégies marketing numériques efficaces pour atteindre votre public cible.",
      duration: "8 semaines",
      level: "Débutant",
      rating: "4.7",
      students: "987"
    },
    {
      title: "Data Science",
      description: "Explorez le monde de l'analyse de données et de l'apprentissage automatique.",
      duration: "20 semaines",
      level: "Avancé",
      rating: "4.9",
      students: "1,567"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Course Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">UI/UX Design Course</h1>
            <p className="text-gray-600 mb-6">
              Welcome to our UI/UX Design course! This comprehensive program will equip you 
              with the knowledge and skills to create exceptional user interfaces (UI) and enhance 
              user experiences (UX).
            </p>
            {/* Course Image */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8">
              <img 
                src="/images/courses/web-design.png" 
                alt="UI/UX Design Course Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Course Content */}
          <div className="space-y-8">
            {courseContent.map((module, index) => (
              <div key={index} className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {module.number}
                  </div>
                  <h2 className="text-xl font-bold">{module.title}</h2>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <LessonCard key={lessonIndex} {...lesson} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage; 