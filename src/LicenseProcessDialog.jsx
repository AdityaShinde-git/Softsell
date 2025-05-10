import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Upload License",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="16 8 12 4 8 8" />
        <line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="4" x2="12" y2="16" />
      </svg>
    ),
    form: ({ data, setData }) => (
      <>
        <label className="block mb-2 text-left font-semibold">License Name</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          name="license"
          value={data.license || ""}
          onChange={e => setData(d => ({ ...d, license: e.target.value }))}
          required
        />
        <label className="block mb-2 text-left font-semibold">License Type</label>
        <select
        className="w-full p-2 mb-4 border rounded"
        name="licenseType"
        value={data.licenseType || ""}
        onChange={e => setData(d => ({ ...d, licenseType: e.target.value }))}
        required
        >
        <option value="">Select Type</option>
        <option>Office Suite</option>
        <option>Antivirus</option>
        <option>Dev Tools</option>
        <option>Other</option>
        </select>


        <label className="block mb-2 text-left font-semibold">License File</label>
        <input
          type="file"
          className="w-full mb-4"
          onChange={e => setData(d => ({ ...d, file: e.target.files[0] }))}
          required
        />
      </>
    ),
  },
  {
    title: "Get Valuation",
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <path d="M12 12v2m0-6v2m-4 4h8" />
      </svg>
    ),
    form: ({ data }) => (
      <div className="text-center py-6">
        <div className="text-2xl font-semibold mb-2">Estimated Value:</div>
        <div className="text-3xl font-bold text-purple-600 mb-4">
          {data.license ? "$1,200" : "--"}
        </div>
        <div className="text-gray-600">This is an instant estimate based on your license details.</div>
      </div>
    ),
  },
  {
    title: "Get Paid",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a5 5 0 0010 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0 0h-2m2 0h2" />
      </svg>
    ),
    form: ({ data, setData }) => (
      <>
        <label className="block mb-2 text-left font-semibold">Your Payment Email</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          name="email"
          type="email"
          value={data.email || ""}
          onChange={e => setData(d => ({ ...d, email: e.target.value }))}
          required
        />
        <div className="text-green-700 font-semibold mb-2">
          Payment will be sent within 24 hours after license transfer.
        </div>
      </>
    ),
  },
];

export function LicenseProcessDialog({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleNext = e => {
    e && e.preventDefault();
    if (step < steps.length - 1) setStep(s => s + 1);
    else setSubmitted(true);
  };

  const handleBack = () => setStep(s => (s > 0 ? s - 1 : 0));

  const handleClose = () => {
    setStep(0);
    setData({});
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-[95vw] max-w-md p-8 relative"
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={handleClose}
              aria-label="Close dialog"
            >
              &times;
            </button>
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className={`rounded-full p-2 border-2 ${
                      i === step
                        ? "border-blue-500 bg-blue-50"
                        : i < step
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-100"
                    } transition`}
                  >
                    {s.icon}
                  </div>
                  <span
                    className={`mt-2 text-xs font-semibold ${
                      i === step
                        ? "text-blue-600"
                        : i < step
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-green-700 font-bold mb-2">Process Complete!</div>
                <div className="text-gray-600">Thank you. Your payment will be processed soon.</div>
                <button
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleNext}>
                {steps[step].form({ data, setData })}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {step === steps.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
