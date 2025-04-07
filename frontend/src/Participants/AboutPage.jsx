import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const AboutPage = () => {
  const achievements = [
    {
      id: 1,
      icon: "👑",
      title: "Trusted by Thousands",
      description: "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals."
    },
    {
      id: 2,
      icon: "🏆",
      title: "Award-Winning Courses",
      description: "Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies."
    },
    {
      id: 3,
      icon: "👍",
      title: "Positive Student Feedback",
      description: "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials."
    },
    {
      id: 4,
      icon: "🤝",
      title: "Industry Partnerships",
      description: "We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies"
    }
  ];

  const goals = [
    {
      id: 1,
      icon: "📚",
      title: "Provide Practical Skills",
      description: "We focus on teaching practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field."
    },
    {
      id: 2,
      icon: "💡",
      title: "Foster Creative Problem-Solving",
      description: "We believe in nurturing innovative thinking and creative abilities, allowing our students to tackle real-world challenges with confidence and innovation."
    },
    {
      id: 3,
      icon: "🤝",
      title: "Promote Collaboration and Community",
      description: "We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together."
    },
    {
      id: 4,
      icon: "🚀",
      title: "Stay Ahead of the Curve",
      description: "The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Spacing after Navbar */}
          <div className="h-8"></div>

          {/* About Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">About Skillbridge</h1>
            <p className="text-gray-600 max-w-3xl mb-8">
              Welcome to our platform, where we are passionate about empowering individuals to 
              master the world of design and development. We offer a wide range of online courses 
              designed to equip learners with the skills and knowledge needed to succeed in the 
              ever-evolving digital landscape.
            </p>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

      {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <p className="text-gray-600 mb-8">
              Our commitment to excellence has led us to achieve significant milestones along our journey. 
              Here are some of our notable achievements:
            </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 text-2xl">
                        {achievement.icon}
                      </div>
                    </div>
                  <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Goals Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Our Goals</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              At Skillbridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. 
              We believe that education should be accessible and transformative, enabling barriers to pursue their passions and make a meaningful impact.
              Through our carefully crafted courses, we aim to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goals.map((goal) => (
                <div 
                  key={goal.id}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-50 text-2xl">
                        {goal.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{goal.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Together Section */}
          <div className="mb-16 bg-white rounded-xl p-8 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-orange-500">Together</span>, let's shape the future of digital innovation
              </h2>
              <p className="text-gray-600 mb-8">
                Join us on this exciting learning journey and unlock your potential in design and development.
          </p>
          <Link 
                to="/signup" 
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
                Join Now
          </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage; 