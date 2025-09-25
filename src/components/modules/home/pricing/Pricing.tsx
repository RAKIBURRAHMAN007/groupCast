import { useState } from "react";

const Pricing = () => {
  const [active, setActive] = useState("monthly");
  return (
    <div id="pricing" className="w-10/12 mx-auto mt-20">
      <h1 className="font-bold text-xl lg:text-[48px] text-center">Pricing</h1>
      <div className="flex items-center justify-center mt-10">
        <div className="inline-flex bg-gray-100 p-1 rounded-full relative">
          <button
            onClick={() => setActive("monthly")}
            className={`relative px-4 lg:px-8 py-1.5 rounded-full text-sm font-medium transition ${
              active === "monthly"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setActive("yearly")}
            className={`relative px-4 lg:px-8 py-1.5 rounded-full text-sm font-medium transition ${
              active === "yearly"
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Yearly
            {active !== "yearly" && (
              <span className="absolute -top-2 -right-3 bg-red-400 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold shadow-md">
                60% off
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-20 gap-5">
        <div className=" rounded-xl h-[415px] border border-gray-200 shadow-sm p-6 bg-white ">
          <div className="text-sm font-medium text-[#23a2fc] mb-2">FREE</div>
          <div className="text-4xl font-semibold mb-1 flex items-center">
            ৳0<span className="text-gray-500 text-sm ">/month</span>
          </div>

          <button className="w-full bg-gray-100 mt-5 text-gray-700 font-semibold py-2 rounded-full hover:bg-[#23a2fc] transition">
            Get Started
          </button>
          <p className="text-gray-500 text-sm mt-6 mb-4">
            Try it out, see what it can do.
          </p>
          <ul className="text-gray-700 space-y-2 text-left">
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>3 AI resume generations</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>2 cover letter templates</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Basic job tracking</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Email support</span>
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#23a2fc] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
            MOST POPULAR
          </div>

          <div className="rounded-xl h-[620px] border-[#23a2fc] border shadow-sm p-6 bg-white">
            <div className="text-sm font-medium text-[#23a2fc] mb-2">PRO</div>
            <div className="text-4xl font-semibold mb-1 flex items-center">
              ৳3000<span className="text-gray-500 text-sm ">/month</span>
            </div>

            <button className="w-full text-[16px] bg-[#23a2fc] text-white mt-5 font-semibold py-2 rounded-full hover:bg-gray-200 transition">
              Let's Get You Hired
            </button>
            <p className="text-gray-500 text-sm mt-6 mb-4">
              Save hours of time and stress for less than the cost of lunch.
            </p>
            <ul className="text-gray-700 space-y-2 text-left">
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Unlimited AI resume generations</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Create job applications in seconds</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Unlimited resume + cover letter</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Host your resume online + translate it</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Advanced job tracking & analytics</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>AI interview preparation</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Interview Buddy</span>
              </li>
              <li className="flex items-start gap-2 text-[16px]">
                <span className="text-blue-500">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className=" rounded-xl border h-[499px] border-gray-200 shadow-sm p-6 bg-white ">
          <div className="text-sm font-medium text-[#23a2fc] mb-2">
            ORGANIZATION
          </div>
          <div className="text-4xl font-semibold mb-1 flex items-center">
            Custom
          </div>

          <button className="w-full bg-gray-100 mt-5 text-gray-700 font-semibold py-2 rounded-full hover:bg-[#23a2fc] transition">
            Talk To Our Team
          </button>
          <p className="text-gray-500 text-sm mt-6 mb-4">
            Everything in Pro, plus:
          </p>
          <ul className="text-gray-700 space-y-2 text-left">
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Team management dashboard</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Advanced analytics & reporting</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Custom integrations</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-start gap-2 text-[16px]">
              <span className="text-blue-500">✓</span>
              <span>24/7 phone support</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-20 flex justify-center">
        <div>
          <h1 className="font-normal text-[16px] leading-snug">
            AIApply transformed my job search! ... I started{" "}
            <br className="lg:block hidden" /> getting 3x more interview invites
            within weeks.
          </h1>
          <div className="flex justify-center mt-1">
            <img className="rounded-full" src="/src/assets/marie.png" alt="" />
            <p className="text-sm">Sophie C, Pro Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
