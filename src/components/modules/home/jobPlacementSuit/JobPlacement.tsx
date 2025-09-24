import React from "react";

const JobPlacement = () => {
  return (
    <section className="w-10/12 mx-auto mt-20">
      <div>
        <h1 className="lg:text-[36px] text-2xl font-bold">
          Comprehensive ai-powered <br /> job placement suite
        </h1>
        <div className="flex items-center gap-1 w-[230px]">
          <div className="w-full h-[3px] bg-black"></div>
          <div>
            <img src="/src/assets/doublestar.png" alt="" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-20">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/ai.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">AI Resume writer</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            Generate compelling bullet points, professional summaries, and
            achievement-focused content that showcases your expertise and
            captures employer attention.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/keyword.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Keyword Optimization</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            Automatically incorporate job-specific keywords without stuffing,
            ensuring your resume ranks high in ATS systems while maintaining
            natural readability.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/atscheker.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">ATS Checker</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            Ensure 99% ATS compatibility with instant scoring and detailed
            feedback on format, keywords, and structure optimization.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/coverletter.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Cover Letter Writer</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            Create personalized cover letters that complement your tailored
            resume and tell your unique professional story effectively.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/jobapplication.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Job Application Tracker</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            Organize applications, interviews, and follow-ups in one
            comprehensive dashboard with automated reminders and status updates.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center text-center p-6 space-y-4 h-[300px]">
          <img
            src="/src/assets/interview.png"
            alt="AI Resume Icon"
            className="w-16 h-16"
          />
          <h3 className="text-xl font-semibold">Interview Preparation</h3>
          <p className="text-[16px] text-gray-600 leading-snug">
            AI-powered practice sessions with role-specific questions,
            personalized feedback, and confidence-building exercises.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JobPlacement;
