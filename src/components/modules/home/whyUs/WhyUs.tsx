import React from "react";

const WhyUs = () => {
  return (
    <section className="w-10/12 mx-auto mt-20">
      <h1 className="lg:text-[40px] font-semibold text-2xl text-center">
        Why Job Seekers Choose Our
        <span className="text-[#23A2FC] ">AI Resume </span>Builder
      </h1>
      <div className="flex justify-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-20 gap-5 ">
          <div className=" shadow-xl bg-gradient-to-br from-[#edf7ff] to-[#f7fbff] rounded-2xl flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-bold">85%</h2>
            <p className="text-[18px] font-semibold mt-3">
              Higher Response Rate
            </p>
            <p className="text-base text-gray-600 mt-2">
              Users report significantly <br /> more interview invitations
            </p>
          </div>
          <div className=" shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-bold">85%</h2>
            <p className="text-[18px] font-semibold mt-3">
              Higher Response Rate
            </p>
            <p className="text-base text-gray-600 mt-2">
              Users report significantly <br /> more interview invitations
            </p>
          </div>
          <div className=" shadow-xl rounded-2xl bg-white  flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-bold">85%</h2>
            <p className="text-[18px] font-semibold mt-3">
              Higher Response Rate
            </p>
            <p className="text-base text-gray-600 mt-2">
              Users report significantly <br /> more interview invitations
            </p>
          </div>
          <div className=" shadow-xl bg-gradient-to-br from-[#edf7ff] to-[#f7fbff] rounded-2xl  flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-4xl font-bold">85%</h2>
            <p className="text-[18px] font-semibold mt-3">
              Higher Response Rate
            </p>
            <p className="text-base text-gray-600 mt-2">
              Users report significantly <br /> more interview invitations
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="pt-20 flex justify-center">
        <button className="bg-black md:w-[293px] h-[56px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2">
          <span className=" text-xs font-semibold md:text-xl">
            Build your resume now
          </span>
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <img src="/src/assets/arr_subnav.svg.png" alt="" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default WhyUs;
