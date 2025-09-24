import React from "react";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-[linear-gradient(to_right,_#f9fbff,_#d5ecfe,_#ebedfe)]">
      <div className="pt-3 w-10/12 mx-auto lg:flex lg:justify-between">
        <div>
          <div className="-ml-20">
            <img src="/src/assets/hero_icon.png" alt="" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl lg:text-5xl font-light">
              AI Resume Builder &
            </h1>
            <h1 className="text-3xl lg:text-5xl font-light">
              Job Placement <span className="font-bold">– Get</span>
            </h1>
            <h1 className="font-black text-3xl lg:text-5xl">Hired 3X Faster</h1>
          </div>

          <p className="text-sm md:text-lg py-3">
            Boost your job search with our AI-powered platform that <br />
            tailors resumes, beats ATS, and helps you land better jobs <br />
            faster.
          </p>

          <button className="bg-black md:w-[357px] h-[56px] text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2">
            <span className="text-xs md:text-xl">
              Improve your resume for FREE
            </span>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/src/assets/arr_subnav.svg.png" alt="" />
            </div>
          </button>
        </div>

        <div className="relative mt-10 lg:w-[48%]">
          {/* Card 1 */}
          <div className="relative w-full lg:w-[350px] bg-white rounded-2xl shadow p-6 z-10 mt-6 lg:mt-28">
            <h2 className="text-lg font-semibold text-gray-400">Name</h2>
            <hr className="my-2 text-gray-200" />

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Professional Summary
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
              </div>
            </section>

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Skill
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
                Experience
              </h3>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              </div>
            </section>
          </div>

          {/* Card 2 */}
          <div className="relative w-full lg:w-auto bg-white rounded-2xl shadow p-6 z-20 mt-6 lg:-mt-[400px] lg:ml-40">
            <div className="absolute top-4 right-1 w-20 h-12">
              <img
                src="/src/assets/Frame 1171277230.png"
                alt=""
                className="absolute -top-20 -right-2 w-[200px] h-[97px] lg:w-[180px] lg:h-[87px]"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-600">
              Ariful Islam
            </h2>
            <div className="flex gap-1 my-2">
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
            </div>

            <section className="mb-4">
              <h3 className="text-xs font-bold pt-1 text-gray-800 uppercase mb-2">
                Professional Summary
              </h3>
              <p className="text-[10px] inline-block px-1">
                <span className="bg-blue-200">
                  Motivated and dedicated individual seeking opportunities to
                </span>{" "}
                <span className="bg-blue-200">
                  apply skills and grow professionally. Strong work ethic with
                  the
                </span>{" "}
                <span className="bg-blue-200">
                  ability to adapt to new challenges.
                </span>
              </p>
            </section>

            <section className="mb-4">
              <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">
                Skill
              </h3>
              <p className="text-xs">
                Java, Python, Go, Apache Kafka, RaviitMQ, Kubernetes, CI/CD with{" "}
                <span className="bg-blue-200">
                  Jenkins, Prometheus, Node.js Typescript, Multimedia, HLS
                </span>
              </p>
            </section>

            <section>
              <h3 className="text-xs font-bold text-gray-800 uppercase mb-2">
                Experience
              </h3>
              <p className="text-xs">
                Once you have your refined resume, explore our job board and
                instantly get hundreds of job matches where you’ll be the top
                applicant!{" "}
                <span className="bg-blue-200">Create, edit, and apply</span> -
                all from one place!
              </p>
              <div className="space-y-1 pt-3">
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
              </div>
            </section>

            <img
              src="/src/assets/coardConnector.png"
              alt="line indicator"
              className="absolute hidden lg:block top-3 -left-40 w-[150px] h-[43px]"
            />
            <img
              src="/src/assets/doublestar.png"
              alt="star icon"
              className="absolute -top-5 -left-5 w-[40px] h-[40px]"
            />
            <div className="absolute bottom-10 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="/src/assets/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">Summary Enhanced</span>
            </div>

            <div className="absolute bottom-0 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="/src/assets/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">
                Relevant Skills Highlighted
              </span>
            </div>

            <div className="absolute -bottom-9 h-[32px] right-0 bg-white shadow-md px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-200 z-40">
              <img
                src="/src/assets/doublestar.png"
                alt="icon"
                className="w-4 h-4"
              />
              <span className="font-medium text-xs">
                Recent Work Experience Enhanced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
