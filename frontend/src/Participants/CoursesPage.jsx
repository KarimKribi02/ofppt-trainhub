import React, { useState } from 'react';
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

const CurriculumItem = ({ number, title, description }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="text-xl font-bold text-gray-900 mb-2">{number}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const CourseCard = ({ title, description, duration, level }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{duration}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{level}</span>
        </div>
        <Link 
          to={`/courses/${title.toLowerCase().replace(/ /g, '-')}`}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

const CourseSection = ({ course }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
      {/* Course Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{course.duration}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{course.level}</span>
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Curriculum</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {course.curriculum.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="text-xl font-bold text-orange-500 mb-2">{item.number}</div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const coursesData = [
    {
      title: "Mobile App Development",
      description: "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
      duration: "8 Weeks",
      level: "Intermediate",
      curriculum: [
        {
          number: "01",
          title: "Introduction to Mobile App Development",
          description: "Learn the basics of mobile app development and get started with your journey."
        },
        {
          number: "02",
          title: "Fundamentals of Swift Programming (iOS)",
          description: "Master the core concepts of Swift programming language."
        },
        {
          number: "03",
          title: "Fundamentals of Kotlin Programming (Android)",
          description: "Learn Kotlin programming for Android development."
        },
        {
          number: "04",
          title: "Building User Interfaces",
          description: "Create beautiful and functional user interfaces for mobile apps."
        },
        {
          number: "05",
          title: "App Deployment and Testing",
          description: "Learn how to test and deploy your applications."
        }
      ]
    },
    {
      title: "Web Development",
      description: "Master modern web development. Learn to create responsive websites and web applications using HTML, CSS, JavaScript, and popular frameworks.",
      duration: "10 Weeks",
      level: "Beginner",
      curriculum: [
        {
          number: "01",
          title: "Introduction to Web Development",
          description: "Learn the fundamentals of web development and how the web works."
        },
        {
          number: "02",
          title: "HTML & CSS Fundamentals",
          description: "Master the building blocks of web pages and styling."
        },
        {
          number: "03",
          title: "JavaScript Programming",
          description: "Learn modern JavaScript and DOM manipulation."
        },
        {
          number: "04",
          title: "Frontend Frameworks",
          description: "Build dynamic web applications with React."
        },
        {
          number: "05",
          title: "Backend Development",
          description: "Create server-side applications and APIs."
        }
      ]
    },
    {
      title: "UI/UX Design",
      description: "Learn to create beautiful and functional user interfaces. Master the principles of user experience design and modern design tools.",
      duration: "6 Weeks",
      level: "Intermediate",
      curriculum: [
        {
          number: "01",
          title: "Design Fundamentals",
          description: "Learn core design principles and color theory."
        },
        {
          number: "02",
          title: "User Research",
          description: "Master user research methods and analysis."
        },
        {
          number: "03",
          title: "Wireframing & Prototyping",
          description: "Create wireframes and interactive prototypes."
        },
        {
          number: "04",
          title: "UI Design",
          description: "Design beautiful and consistent user interfaces."
        },
        {
          number: "05",
          title: "UX Design",
          description: "Create engaging user experiences and flows."
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Online Courses on Design and Development</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Welcome to our online course page, where you can enhance your skills in design and development. 
              Choose from our carefully curated selection of courses designed to provide you with comprehensive 
              knowledge and practical experience.
            </p>
          </div>

          {/* Courses Sections */}
          {coursesData.map((course, index) => (
            <CourseSection key={index} course={course} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesPage; 