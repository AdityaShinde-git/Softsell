import { useState, useEffect, useRef } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', licenseType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setShowNotification(true);
      setProgress(100);
    }
  };

  // Progress bar and auto-close logic
  useEffect(() => {
    if (showNotification) {
      let start = Date.now();
      const duration = 5000;
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(percent);
        if (percent === 0) {
          setShowNotification(false);
          clearInterval(progressRef.current);
        }
      }, 50);
      return () => clearInterval(progressRef.current);
    }
  }, [showNotification]);

  // Manual close handler
  const handleClose = () => {
    setShowNotification(false);
    clearInterval(progressRef.current);
  };

  return (
    <section className="py-16 px-4 bg-gray-100 dark:bg-gray-900 text-center relative transition-colors duration-500">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Get in Touch</h2>
      {submitted ? (
        <p className="text-green-600 dark:text-green-400 font-semibold">Thanks! We'll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition"
            required
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition"
          />
          <select
            name="licenseType"
            value={form.licenseType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          >
            <option value="">License Type</option>
            <option>Office Suite</option>
            <option>Antivirus</option>
            <option>Dev Tools</option>
            <option>Other</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition font-semibold"
          >
            Submit
          </button>
        </form>
      )}

      {/* Notification Popout */}
      {showNotification && (
        <div className="fixed bottom-8 left-8 z-50">
          <div className="bg-green-500 dark:bg-green-700 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 relative animate-slide-in min-w-[260px]">
            <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="flex-1">Form submitted successfully!</span>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-gray-200 text-xl font-bold focus:outline-none"
              aria-label="Close notification"
            >
              &times;
            </button>
            {/* Progress Bar */}
            <div className="absolute left-0 bottom-0 w-full h-1 bg-green-700/30 dark:bg-green-900/40 rounded-b-lg overflow-hidden">
              <div
                className="h-full bg-white/80 dark:bg-white/40 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <style>{`
            @keyframes slide-in {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-slide-in {
              animation: slide-in 0.3s ease;
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
