import doublestar from "../../../../assets/doublestar.png";
import tick from "../../../../assets/tick.png";
import neuron from "../../../../assets/neuron.png";
import seetinGear from "../../../../assets/seetinGear.png";
import reading from "../../../../assets/reading.png";

const Technology = () => {
  const pointsFirst = [
    "AI-powered bullet point writer creates achievement-focused descriptions",
    "Automatic quantification of accomplishments with industry-specific metrics",
    "Professional summary generator tailored to your career level and goals",
    "Skills section optimization based on job market trends",
  ];

  const pointsSecond = [
    "Real-time ATS compatibility scoring (0-100 scale)",
    "Keyword density analysis and optimization",
    "Format checking for maximum readability by ATS systems",
    "Industry-specific template recommendations",
  ];
  const pointsThird = [
    "Create unlimited resume variations for different job types",
    "Master resume with all experience that branches into targeted versions",
    "One-click customization for specific job applications",
    "Version history and comparison tools",
  ];

  return (
    <section className="w-9/12 md:w-9/12 mx-auto mt-20">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[36px] font-bold leading-snug">
          Revolutionary AI Resume Building Technology
        </h1>
        <div className="flex items-center gap-1 w-[230px] mt-2">
          <div className="w-full h-[3px] bg-black"></div>
          <img src={doublestar} alt="star divider" className="w-5 h-5" />
        </div>
      </div>

      <section className="mt-20 md:flex items-center justify-between gap-10">
        <div className="md:w-1/2">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-semibold mb-6">
            Smart Content Generation
          </h2>
          <div className="space-y-5">
            {pointsFirst.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <img src={tick} alt="tick icon" className="w-5 h-5 mt-1" />
                <p className="text-sm md:text-base lg:text-[18px] leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end w-full md:w-1/2 mt-8 md:mt-0">
          <img
            className="max-w-xs md:max-w-sm lg:max-w-md"
            src={neuron}
            alt="Neuron illustration"
          />
        </div>
      </section>

      <section className="mt-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side Gear Image */}
        <div className="flex justify-center md:justify-start w-full md:w-1/2 mt-8 md:mt-0">
          <img
            className="max-w-xs md:max-w-sm lg:max-w-md"
            src={seetinGear}
            alt="Gear illustration"
          />
        </div>

        {/* Right Side Text */}
        <div className="">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-semibold mb-6">
            ATS Optimization Engine
          </h2>
          <div className="space-y-5">
            {pointsSecond.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <img src={tick} alt="tick icon" className="w-5 h-5 mt-1" />
                <p className="text-sm md:text-base lg:text-[18px] leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 md:flex items-center justify-between gap-10">
        <div className="md:w-1/2">
          <h2 className="text-xl md:text-2xl lg:text-[32px] font-semibold mb-6">
            Multi-Version Resume Management
          </h2>
          <div className="space-y-5">
            {pointsThird.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <img src={tick} alt="tick icon" className="w-5 h-5 mt-1" />
                <p className="text-sm md:text-base lg:text-[18px] leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end w-full md:w-1/2 mt-8 md:mt-0">
          <img
            className="max-w-xs md:max-w-sm lg:max-w-md"
            src={reading}
            alt=""
          />
        </div>
      </section>
    </section>
  );
};

export default Technology;
