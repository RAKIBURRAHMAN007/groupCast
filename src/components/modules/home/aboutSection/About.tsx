import React from "react";
import Chatbubble from "./Chatbubble";
import AIResumeBuilder from "./AIResumeBuilder";

const About = () => {
  return (
    <section className="w-10/12 mx-auto mt-20">
      <div>
        <h1 className="lg:text-[36px] text-2xl font-bold">
          Why Choose Our AI Job <br /> Placement Platform?
        </h1>
        <div className="flex items-center gap-1 w-[230px]">
          <div className="w-full h-[3px] bg-black"></div>
          <div>
            <img src="/src/assets/doublestar.png" alt="" />
          </div>
        </div>
      </div>
      <section className="mt-20 md:flex items-center justify-between">
        <div className="pt-16">
          <h1 className="text-2xl lg:text-[40px] font-semibold">
            Smart Resume Tailoring
          </h1>
          <p className="text-sm lg:text-lg my-1">
            Let our smart AI craft the perfect resume for every <br />{" "}
            job—packed with the right keywords, skills, and <br /> experiences
            to grab recruiters’ attention and land <br /> interviews faster.
          </p>
          <button className="bg-black md:w-[233px] h-[56px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2">
            <span className=" text-xs font-semibold md:text-xl">
              Create a resume
            </span>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/src/assets/arr_subnav.svg.png" alt="" />
            </div>
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            className="w-full h-auto"
            src="/src/assets/createresume.png"
            alt=""
          />
        </div>
      </section>
      <section className="mt-20 flex flex-col-reverse md:flex-row  md:items-center md:justify-between">
        <div className="md:w-1/2">
          <img
            className="md:h-[416px] w-full md:w-[416px]"
            src="/src/assets/jobmatching.png"
            alt=""
          />
        </div>
        <div className="pt-16">
          <h1 className="text-2xl lg:text-[40px] font-semibold">
            Lightning-Fast Job <br /> Matching
          </h1>
          <p className="text-sm lg:text-lg my-1">
            AI-powered 1:1 Job to Resume matching that positions you <br />{" "}
            perfectly aligned in the competitive Job market with your skills,
            <br /> salary expectations, and career goals.
          </p>
          <div className="flex items-center gap-1 w-[230px]">
            <div className="w-full h-[3px] bg-black"></div>
            <div>
              <img
                className="opacity-30"
                src="/src/assets/doublestar.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20 md:flex items-center justify-between">
        <div className="pt-16">
          <h1 className="text-2xl lg:text-[40px] font-semibold">
            Career Mentoring
          </h1>
          <p className="text-sm lg:text-lg my-1">
            Personalized Career Mentoring to position yourself <br /> strong in
            the Job market; Craft a job-winning resume <br /> and optimize your
            profile for maximum visibility. Step- <br />
            by-step mentoring to align your skills, resume, and <br /> career
            path that helps you get interview and land on <br /> a Job with
            confidence.
          </p>
          <button className="bg-black md:w-[203px] h-[56px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2">
            <span className=" text-xs font-semibold md:text-xl">
              Go Mentoring
            </span>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/src/assets/arr_subnav.svg.png" alt="" />
            </div>
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            className="w-full h-auto"
            src="/src/assets/carriermonitoring.png"
            alt=""
          />
        </div>
      </section>
      <Chatbubble></Chatbubble>
      <AIResumeBuilder></AIResumeBuilder>
    </section>
  );
};

export default About;
