import React from "react";

const Review = () => {
  return (
    <div className="w-10/12 mx-auto mt-20">
      <h1 className="font-bold text-xl lg:text-[36px]">Voice From the world</h1>
      <p className="lg:text-[18px] text-sm">
        What our users say after using Jobmantic and how it helped them <br />
        improve their Resume
      </p>
      <div className="md:flex justify-between">
        <div>
          <div className="relative w-80 h-80 mx-auto mt-20">
            {/* Center Image */}
            <div className="absolute inset-0 m-auto w-[120px] h-[120px] rounded-2xl overflow-hidden">
              <img
                src="/src/assets/middle.png"
                alt="Center"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Left */}
            <div className="absolute top-20 left-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="/src/assets/top.png"
                alt="Top Left"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Right */}
            <div className="absolute top-10 right-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="/src/assets/topright.png"
                alt="Top Right"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-10 left-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="/src/assets/leftbottom.png"
                alt="Bottom Left"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-20 right-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="/src/assets/rightbottom.png"
                alt="Bottom Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Michelle V.</span>
              <span className="font-light">Sr. Digital Marketing Manager</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Shiva V.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Instructional Designer</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl  rounded-br-2xl p-6">
            {/* Quote icon */}
            <img src="/src/assets/quote.png" alt="" />

            {/* Testimonial text */}
            <p className=" text-[16px] text-center">
              omg i cannot believe i am getting a interview after using this.
              the recommendations is well thought off. highly recommend everyone
              to use this website.
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Michelle V."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Michelle V.</span>{" "}
                <span className="text-gray-500">
                  / Sr. Digital Marketing Manager
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-[550px] mt-4 md:ml-30  mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl  rounded-br-2xl p-6">
            {/* Quote icon */}
            <img src="/src/assets/quote.png" alt="" />

            {/* Testimonial text */}
            <p className=" text-[16px] text-center">
              omg i cannot believe i am getting a interview after using this.
              the recommendations is well thought off. highly recommend everyone
              to use this website.
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Michelle V."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Michelle V.</span>{" "}
                <span className="text-gray-500">
                  / Sr. Digital Marketing Manager
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-xl mt-4 md:ml-24  mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl  rounded-br-2xl p-6">
            <img src="/src/assets/quote.png" alt="" />

            <p className=" text-[16px] text-center">
              omg i cannot believe i am getting a interview after using this.
              the recommendations is well thought off. highly recommend everyone
              to use this website.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Michelle V."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Michelle V.</span>{" "}
                <span className="text-gray-500">
                  / Sr. Digital Marketing Manager
                </span>
              </p>
            </div>
          </div>
          <div className="max-w-xl mt-4 md:ml-24 mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Review;
