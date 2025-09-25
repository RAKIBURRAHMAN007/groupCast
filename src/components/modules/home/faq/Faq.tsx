import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why should I use an AI Resume Editor?",
      answer: `Using an AI Resume Editor can help you in 3 major ways.

1. It significantly saves you time so you can send a larger volume of applications. Our users on average save 2 hrs of editing time per job application.

2. The AI Resume Editor provides smart recommendations for how to optimize your resume to be more competitive for respective jobs.

3. It can help you create a brand new, ATS friendly resume to increase your chances of grabbing the recruiter's attention. All this saves you precious time and eliminates unnecessary guesswork from the job search process.`,
    },
    {
      question: "Why is Jobright's AI Resume Editor the best?",
      answer:
        "Because it combines AI-powered recommendations with user-friendly editing, helping you create a recruiter-ready resume in minutes.",
    },
    {
      question:
        "I have a resume, just need some feedback. Is the AI Resume Editor relevant for me?",
      answer:
        "Yes! Even if you already have a resume, the AI Resume Editor can scan it, provide optimization tips, and improve your ATS score.",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-10/12 mt-20 mx-auto  space-y-4">
      <h1 className="font-bold text-center lg:text-[36px] text-xl">
        Frequently <br /> Asked Questions
      </h1>
      <div className="w-full max-w-lg mx-auto mt-6 mb-10">
        <input
          type="text"
          placeholder="Search your questions"
          className="w-full px-4 py-2 rounded-full  bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
        />
      </div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-5 cursor-pointer transition"
          onClick={() => toggleFAQ(index)}
        >
          <div className="flex justify-between  items-center">
            <h3 className="font-semibold text-[20px] text-gray-800">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 border-2 rounded-full text-gray-900" />
            ) : (
              <ChevronDown className="w-5 h-5 border-2 rounded-full text-gray-900" />
            )}
          </div>
          {openIndex === index && (
            <p className="mt-3 text-gray-800 w-3/5 text-[16px] text-start whitespace-pre-line">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
