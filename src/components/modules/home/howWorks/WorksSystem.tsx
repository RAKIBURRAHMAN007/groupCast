import React from "react";

const WorksSystem = () => {
  return (
    <div className="w-10/12 mx-auto mt-20">
      <h1 className="lg:text-[40px] font-semibold text-2xl text-center">
        How Our
        <span className="text-[#23A2FC] ">AI Resume </span> to get Builder Works
      </h1>
      <div className="grid lg:grid-cols-3 mt-20 md:grid-cols-2 grid-cols-1 gap-y-6 gap-x-6">
        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              1
            </div>
            <div>
              <img src="/src/assets/upload.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">Upload or Import</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              Start with existing resume, LinkedIn profile, or build from
              scratch
            </p>
          </div>
        </div>
        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              2
            </div>
            <div>
              <img src="/src/assets/analysis.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">AI Analysis</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              Our system analyzes your background and identifies strengths
            </p>
          </div>
        </div>

        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              3
            </div>
            <div>
              <img src="/src/assets/target.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">Upload or Import</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              Start with existing resume, LinkedIn profile, or build from
              scratch
            </p>
          </div>
        </div>
        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              4
            </div>
            <div>
              <img src="/src/assets/concept.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">Content Enhancement</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              AI improves bullet points, adds keywords, optimizes formatting
            </p>
          </div>
        </div>
        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              5
            </div>
            <div>
              <img src="/src/assets/ats.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">ATS Scoring</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              Real-time feedback ensures maximum compatibility
            </p>
          </div>
        </div>
        <div className=" bg-white rounded-2xl shadow p-6 ">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e0f1ff]  font-bold rounded-full">
              6
            </div>
            <div>
              <img src="/src/assets/apply.png" alt="" />
            </div>
          </div>
          <div>
            <h1 className="text-[20px] font-medium">Export & Apply</h1>
            <p className="text-[18px] mt-2 font-normal leading-snug">
              Download in multiple formats (PDF, DOCX, ATS-friendly)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksSystem;
