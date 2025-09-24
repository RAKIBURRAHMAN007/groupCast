import React from "react";

const AIResumeBuilder = () => {
  return (
    <section className="mt-20 lg:h-[360px] bg-gradient-to-r from-[#99DAF4] to-[#ACA2EF] px-6 md:px-12 rounded-[70px] rounded-br-none rounded-tl-none flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
      <div className="p-5 mb-10 md:mb-0 relative z-10">
        <h1 className="text-3xl md:text-[40px] font-semibold text-black">
          AI Resume Builder
        </h1>
        <p className="text-sm md:text-lg text-black my-1">
          Create ATS-Optimized Resumes That Get Results
          <br />
          Build professional, ATS-friendly resumes that pass automated <br />
          screening and impress hiring managers. Our AI technology <br />
          creates personalized content based on your experience and <br />
          target job requirements.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-blue-700 transition">
          <span className="text-sm font-semibold md:text-lg">
            Build your resume now
          </span>
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <img
              src="/src/assets/arr_subnav.svg.png"
              alt="arrow icon"
              className="w-4 h-4"
            />
          </div>
        </button>
      </div>

      <div className="w-full md:w-[40%] flex justify-center md:justify-end relative z-10">
        <img
          src="/src/assets/aihuman.png"
          alt="AI Human Illustration"
          className="h-[300px] md:h-[360px] object-contain relative z-10"
        />

        <img
          src="/src/assets/whitestar.png"
          alt="star"
          className="absolute top-40 -left-1 w-6 md:w-8"
        />
        <img
          src="/src/assets/whitestar.png"
          alt="star"
          className="absolute bottom-56 -right-1 w-6 md:w-8"
        />
      </div>
    </section>
  );
};

export default AIResumeBuilder;
