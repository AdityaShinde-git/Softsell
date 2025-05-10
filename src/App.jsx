import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ChatWidget from "./ChatWidget";
import ContactForm from "./ContactForm";
import HowItWorks from './HowItWorks';
import { LicenseProcessDialog } from './LicenseProcessDialog';
import herolgo from "./assets/softselllogo.png";
const Hero = ({ onSellClick }) => (
  <section className="bg-gradient-to-br from-purple-800 via-purple-700 to-blue-800 text-white py-20 px-4 text-center relative overflow-hidden">
    {/* Decorative background shapes */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900 opacity-30 rounded-full blur-3xl -z-10" />
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 opacity-20 rounded-full blur-3xl -z-10" />

    {/* Logo */}
    <div className="flex justify-center mb-8">
      <img
        src={herolgo}
        alt="Company Logo"
        className="h-20 w-20 md:h-28 md:w-28 rounded-full shadow-lg bg-white/90 p-2 object-contain"
        style={{ border: "4px solid #fff" ,cursor:'pointer'}}
        onClick={() => window.location.reload()}
      />
    </div>

    {/* Headline */}
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">
      Turn Unused Software Into Profit
    </h1>
    <p className="mt-2 mb-8 text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
      We help companies resell their unused software licenses for cash. Simple, fast, and secure.
    </p>
    <button
      className="mt-6 px-6 py-3 bg-purple-900 text-purple-400 rounded-full font-semibold hover:bg-white color-white transition hover:scale-110"
      onClick={onSellClick}
    >
      Sell My Licenses
    </button>
  </section>
);



const features = [
      {
        icon: (
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        ),
        title: "Instant Quotes",
        desc: "Get real-time, competitive offers for your unused software licenses.",
      },
      {
        icon: (
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect width="18" height="14" x="3" y="5" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        ),
        title: "Secure Transactions",
        desc: "Your data and payments are protected with enterprise-grade security.",
      },
      {
        icon: (
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        ),
        title: "Fast Payouts",
        desc: "Receive your funds within 24 hours of accepting our offer.",
      },
      {
        icon: (
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15s1.5-2 4-2 4 2 4 2" />
            <path d="M9 9h.01M15 9h.01" />
          </svg>
        ),
        title: "Expert Support",
        desc: "Our specialists guide you at every step for a smooth experience.",
      },
    ];

const cardVariants = {
      initial: { opacity: 0, y: 40 },
      animate: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
      }),
      hover: { scale: 1.06, boxShadow: "0 6px 32px 0 rgba(80,60,180,0.14)" },
    };
const WhyChooseUs = () => (
  <section className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
  {/* Glow background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-r from-blue-400/20 via-purple-300/20 to-transparent blur-2xl rounded-full" />
  </div>
  <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-900 dark:text-white drop-shadow">Why Choose Us</h2>
  <div className="grid md:grid-cols-4 gap-8 relative z-10">
    {features.map((f, i) => (
      <motion.div
        key={f.title}
        className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        tabIndex={0}
        initial="initial"
        whileInView="animate"
        whileHover="hover"
        whileFocus="hover"
        viewport={{ once: true }}
        variants={cardVariants}
        custom={i}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-full p-4 shadow group-hover:scale-110 transition-transform duration-300">
            {f.icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{f.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
      </motion.div>
    ))}
  </div>
</section>
);
// testimonaial section 
const Testimonials = () => {
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <svg  className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const testimonials = [
    ['Jane Doe', 'IT Manager', 'TechCorp', 'SoftSell made it so easy to offload our unused licenses. Highly recommend!'],
    ['John Smith', 'Procurement Lead', 'CloudNova', 'Quick, transparent, and professional. We got paid in 24 hours!'],
    ['Alice Johnson', 'CTO', 'Innovatech', 'The process was seamless and the team was very supportive throughout.'],
    ['Bob Brown', 'Director', 'DataSystems', 'We saved a lot of money and time with their efficient service.'],
    ['Aniket Bhatacharya', 'Director', 'DataSystems', 'Stock Message that would provide professional look to the website.'],
    ['Charlie Davis', 'CEO', 'WebSolutions', 'Their expertise in software licensing is unmatched.'],
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 duration-300">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">What Our Customers Say</h2>
    <div className="relative">
      <Slider {...settings}>
        {testimonials.map(([name, role, company, quote], i) => (
          <div key={i} className="px-4">
            <div className="bg-gray-300 dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center h-full flex flex-col justify-between transition-colors duration-300">
              <div>
                <p className="text-gray-600 dark:text-gray-300 italic text-lg mb-6">"{quote}"</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</p>
                <p className="text-gray-500 dark:text-gray-400">{role}, {company}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</section>
  );
};

//testimonial section END!!!!!!!!!!!!!!!!!!!!!!!!!



const Footer = () => (
<footer className="text-center py-6 text-sm bg-purple-800 dark:bg-gray-900 text-white dark:text-gray-100 transition-colors duration-300">
  © 2025 Aditya(SoftSell). All rights reserved.
</footer>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openAIApiKey = "";
  useEffect(() => {
    // Toggle the 'dark' class on <html>
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="font-sans min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative">
            <div className="fixed top-6 right-6 z-50">
        <button
          aria-label="Toggle dark mode"
          type="button"
          onClick={() => setDarkMode((d) => !d)}
          className="group w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center px-1 transition-colors duration-300 shadow-lg border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* Switch Knob */}
          <span
            className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform transition-transform duration-300 flex items-center justify-center
              ${darkMode ? "translate-x-6" : "translate-x-0"}`}
          >
            {/* Icon transition */}
            <span className="transition-opacity duration-300">
              {darkMode ? (
                // Moon Icon
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                // Sun Icon
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.47a1 1 0 011.42 1.42l-.71.7a1 1 0 11-1.41-1.41l.7-.71zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.47 4.22a1 1 0 011.41 1.41l-.7.71a1 1 0 01-1.42-1.42l.71-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.47a1 1 0 01-1.42 1.42l-.71-.7a1 1 0 111.41-1.41l.7.69zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.47-4.22a1 1 0 01-1.41-1.41l.7-.71a1 1 0 111.42 1.42l-.71.7z"
                    clipRule="evenodd"
                  />
                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                </svg>
              )}
            </span>
          </span>     
        </button>     
      </div>

      <Hero onSellClick={() => setDialogOpen(true)} />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <Footer />
      <ChatWidget openAIApiKey={openAIApiKey} />
      <LicenseProcessDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

export default App;
