import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="w-11/12 mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-800">
        {/* Logo + Features */}
        <div>
          <h1 className="text-xl font-bold mb-4">
            <span className="text-blue-500">Job</span>mantic
            <span className="text-blue-500 text-base">★</span>
          </h1>
          <ul className="mt-4 space-y-2">
            {[
              "AI Resume",
              "AI Coverletter",
              "Pricing",
              "Career",
              "Organization",
              "Outplacement",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog */}
        <div>
          <h3 className="font-semibold mb-4">Blog</h3>
          <ul className="space-y-2">
            {[
              "Is Jobright Legit?",
              "Success Stories from Jobright Users",
              "What Top AI Companies Are Looking For",
              "Jobright AI Agent Launch",
              "Top Entry Level Jobs",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Tools */}
        <div>
          <h3 className="font-semibold mb-4">Related Tools</h3>
          <ul className="space-y-2">
            {[
              "AI Job Assistant",
              "AI Cover Letter Generator",
              "AI Resume Helper",
              "AI Job Tracker",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-blue-500 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information + Socials */}
        <div className="flex flex-col justify-between">
          <div className="flex gap-3 mb-6">
            <a
              href="#"
              className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <FaXTwitter />
            </a>
          </div>
          <ul className="space-y-2">
            {["About Us", "Privacy Policy", "Terms of Service"].map(
              (item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
