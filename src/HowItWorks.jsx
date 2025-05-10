import { motion } from "framer-motion";

const steps = [
  {
    icon: (
      // Upload License Icon
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="16 8 12 4 8 8" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="4" x2="12" y2="16" />
      </svg>
    ),
    title: "Upload License",
    desc: "Fill out our secure form and upload details of your unused software license. We support all major vendors.",
  },
  {
    icon: (
      // Get Valuation Icon
      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <path d="M12 12v2m0-6v2m-4 4h8" />
      </svg>
    ),
    title: "Get Valuation",
    desc: "Our experts review your submission and instantly provide a fair market valuation-no waiting, no obligation.",
  },
  {
    icon: (
      // Get Paid Icon
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a5 5 0 0010 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0 0h-2m2 0h2" />
      </svg>
    ),
    title: "Get Paid",
    desc: "Accept the offer, transfer the license, and receive your payment securely-often within 24 hours.",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, type: "spring", stiffness: 80 },
  }),
  hover: { scale: 1.06, boxShadow: "0 6px 32px 0 rgba(80,60,180,0.13)" },
};

const HowItWorks = () => (
  <section
    className="relative py-20 px-4 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
    id="howitworks"
  >
    {/* Decorative Glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-r from-blue-400/20 via-purple-300/20 to-transparent blur-2xl rounded-full" />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-900 dark:text-white drop-shadow">
      How It Works
    </h2>
    <div className="grid md:grid-cols-3 gap-8 relative z-10">
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          whileFocus="hover"
          viewport={{ once: true }}
          variants={cardVariants}
          custom={i}
        >
          {/* Step Number */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative">
              <span className="absolute -top-5 -left-5 text-3xl font-bold text-blue-300 dark:text-blue-900 opacity-30 select-none pointer-events-none">{i + 1}</span>
              <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-white dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-full p-5 shadow group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
