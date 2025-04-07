import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Benefits = () => {
  const [openFaqId, setOpenFaqId] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const partners = [
    { 
      name: 'PayPal', 
      logo: '/images/partners/zapier.png'
    },
    { 
      name: 'Google', 
      logo: '/images/partners/zoom.png'
    },
    { 
      name: 'Stripe', 
      logo: '/images/partners/stripe.png'
    },
    { 
      name: 'Spotify', 
      logo: '/images/partners/spotify.png'
    },
    { 
      name: 'Netflix', 
      logo: '/images/partners/netflix.png'
    },
    { 
      name: 'Amazon', 
      logo: '/images/partners/amazon.png'
    }
  ];

  const benefitsList = [
    {
      id: "01",
      title: "Flexible Learning Schedule",
      description: "Adapt your learning to your schedule with our flexible platform."
    },
    {
      id: "02",
      title: "Expert Instruction",
      description: "Learn from field experts who share their practical experience."
    },
    {
      id: "03",
      title: "Diverse Course Offerings",
      description: "Access a wide range of courses covering different technology areas."
    },
    {
      id: "04",
      title: "Updated Curriculum",
      description: "Enjoy regularly updated content to stay up to date with the latest technologies."
    },
    {
      id: "05",
      title: "Practical Projects",
      description: "Put your knowledge into practice through concrete and professional projects."
    },
    {
      id: "06",
      title: "Interactive Learning Environment",
      description: "Participate in an interactive and collaborative learning environment."
    }
  ];

  const courses = [
    {
      id: 1,
      image: '/images/courses/web-design.png',
      category: "Design",
      duration: "8 Weeks",
      title: "Fundamentals of Web Design",
      instructor: "John Smith",
      description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.",
    },
    {
      id: 2,
      image: '/images/courses/ux-design.png',
      category: "Experience",
      duration: "10 Weeks",
      title: "UI/UX Design",
      instructor: "Emily Johnson",
      description: "Master the art of creating user experiences (UX) and improve your interface design principles.",
    },
    {
      id: 3,
      image: '/images/courses/mobile-dev.png',
      category: "Mobile",
      duration: "12 Weeks",
      title: "Mobile Application Development",
      instructor: "David Brown",
      description: "Dive into the world of mobile development. Learn how to create iOS and Android apps.",
    },
    {
      id: 4,
      image: '/images/courses/graphic-design.png',
      category: "Design",
      duration: "6 Weeks",
      title: "Graphic Design for Beginners",
      instructor: "Sarah Thompson",
      description: "Discover the fundamentals of graphic design, including typography, color theory, and layout.",
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah L.",
      image: "/images/testimonials/sarah.png",
      text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive.",
    },
    {
      id: 2,
      name: "Jason M.",
      image: "/images/testimonials/jason.png",
      text: "The UI/UX design course exceeded my expectations. The instructor's expertise helped me improve my skills.",
    },
    {
      id: 3,
      name: "Emily R.",
      image: "/images/testimonials/emily.png",
      text: "The mobile app development course was fantastic! The step-by-step tutorials helped me grasp the concepts easily.",
    },
    {
      id: 4,
      name: "Michael K.",
      image: "/images/testimonials/michael.png",
      text: "I enrolled in the graphic design course as a beginner, and it was the perfect starting point.",
    }
  ];

  const pricingPlans = [
    {
      name: "Free Plan",
      price: 0,
      features: [
        { text: "Access to selected free courses", included: true },
        { text: "Limited course materials and resources", included: true },
        { text: "Basic community support", included: true },
        { text: "No certification upon completion", included: true },
        { text: "Ad-supported platform", included: true },
        { text: "Access to exclusive Pro Plan community forums", included: false },
        { text: "Early access to new courses and updates", included: false }
      ]
    },
    {
      name: "Pro Plan",
      price: 79,
      features: [
        { text: "Unlimited access to all courses", included: true },
        { text: "Unlimited course materials and resources", included: true },
        { text: "Priority support from instructors", included: true },
        { text: "Course completion certificates", included: true },
        { text: "Ad-free experience", included: true },
        { text: "Access to exclusive Pro Plan community forums", included: true },
        { text: "Early access to new courses and updates", included: true }
      ]
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "Can I enroll in multiple courses at once?",
      answer: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience."
    },
    {
      id: 2,
      question: "What kind of support can I expect from instructors?",
      answer: "Our instructors provide comprehensive support through course discussions, Q&A sessions, and personalized feedback on assignments."
    },
    {
      id: 3,
      question: "Are the courses self-paced or do they have specific start and end dates?",
      answer: "Most of our courses are self-paced, allowing you to learn at your own speed. Some specialized courses may have specific schedules."
    },
    {
      id: 4,
      question: "Are there any prerequisites for the courses?",
      answer: "Prerequisites vary by course. Basic courses typically don't require prior knowledge, while advanced courses may have specific requirements."
    },
    {
      id: 5,
      question: "Can I download the course materials for offline access?",
      answer: "Yes, Pro Plan members can download course materials for offline viewing. Free plan users have online-only access."
    }
  ];

  const handleFaqClick = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleBillingPeriodChange = (period) => {
    setBillingPeriod(period);
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span>Unlock </span>
              <span className="text-orange-500">Your Creative Potential</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            with Online Design and Development Courses.
          </p>
          <p className="text-gray-500 text-sm mb-8">
          Learn from Industry Experts and Enhance Your Skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors">
              Explore Courses
            </button>
            <button className="text-gray-700 px-8 py-3 rounded-md border border-gray-300 hover:border-orange-500 transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4">
         
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner, index) => (
              <div key={index} className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Benefits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the benefits of our online learning platform. We offer a comprehensive educational experience to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsList.map((benefit) => (
            <div 
              key={benefit.id} 
              className="p-6 bg-white rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-2xl font-bold text-orange-500 mr-4">
                  {benefit.id}
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Courses</h2>
              <p className="text-gray-600 max-w-2xl">
              Discover our selection of high-quality courses to develop your skills.
              </p>
            </div>
            <Link 
              to="/courses" 
              className="text-gray-800 hover:text-orange-500 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <span className="text-sm text-gray-500">{course.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">By</span>
                      <span className="text-sm font-medium">{course.instructor}</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                    >
                     Get it Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Testimonials</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt interdum eget ut id imperdiet et. Cras eu et dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>
            <Link to="/testimonials" className="text-orange-500 hover:text-orange-600 font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg">
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium">{testimonial.name}</span>
                  </div>
                  <Link
                    to={`/testimonials/${testimonial.id}`}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    Read Full Story
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">Frequently<br />Asked Questions</h2>
              <p className="text-gray-600 mb-4">
              Do you have any further questions? Contact our<br />Team via  support@trainhub.com
              </p>
              <Link to="/faq" className="text-orange-500 hover:text-orange-600 font-medium">
                View All FAQ'S
              </Link>
            </div>

            <div className="md:w-2/3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => handleFaqClick(faq.id)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <span className={`transform transition-transform ${openFaqId === faq.id ? 'rotate-45' : ''}`}>
                      {openFaqId === faq.id ? (
                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </span>
                  </button>
                  {openFaqId === faq.id && (
                    <div className="pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     <Footer />
    </>
  );
};

export default Benefits; 