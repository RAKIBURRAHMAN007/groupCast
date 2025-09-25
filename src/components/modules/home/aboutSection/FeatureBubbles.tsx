// Import all images
import SmartResume from "../../../../assets/smartResume.png";
import ThreeXHigher from "../../../../assets/3xhigher.png";
import LightningFast from "../../../../assets/lighitingfast.png";
import ATSScore from "../../../../assets/attscore.png";
import JobPlacement from "../../../../assets/job.png";
import Career from "../../../../assets/carrier.png";

const FeatureBubbles = () => {
  return (
    <div className="w-10/12 mx-auto mt-20 mb-10">
      <div className="hidden lg:flex justify-center ml-16">
        <div className="flex relative">
          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(20px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img
                  src={SmartResume}
                  alt="Smart Resume Tailoring"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                Smart Resume Tailoring
              </p>
            </div>
            <div
              className="bg-[#E6F2FF] rounded-full w-[90px] h-[90px] -ml-20 mt-6 z-10"
              style={{ transform: "translateY(20px)" }}
            ></div>
          </div>

          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(-2px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img
                  src={ThreeXHigher}
                  alt="3X Higher Interview Rate"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                3X Higher Interview Rate
              </p>
            </div>
            <div
              className="bg-[#E6F2FF] rounded-full w-[90px] h-[90px] -ml-20 mt-6 z-10"
              style={{ transform: "translateY(-20px)" }}
            ></div>
          </div>

          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(20px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img
                  src={LightningFast}
                  alt="Lightning-Fast Job Matching"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                Lightning-Fast Job Matching
              </p>
            </div>
            <div
              className="bg-[#E6F2FF] rounded-full w-[90px] h-[90px] -ml-20 mt-6 z-10"
              style={{ transform: "translateY(20px)" }}
            ></div>
          </div>

          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(-2px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img
                  src={ATSScore}
                  alt="ATS Score Optimization"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                ATS Score Optimization
              </p>
            </div>
            <div
              className="bg-[#E6F2FF] rounded-full w-[90px] h-[90px] -ml-20 mt-6 z-10"
              style={{ transform: "translateY(-20px)" }}
            ></div>
          </div>

          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(20px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img
                  src={JobPlacement}
                  alt="Premium Job Placement"
                  className="w-8 h-8"
                />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                Premium Job Placement
              </p>
            </div>
            <div
              className="bg-[#E6F2FF] rounded-full w-[90px] h-[90px] -ml-20 mt-6 z-10"
              style={{ transform: "translateY(20px)" }}
            ></div>
          </div>

          <div className="flex items-center">
            <div
              className="flex flex-col items-center justify-center bg-[#E6F2FF] rounded-full 
                         w-[120px] h-[120px] p-4 z-20 relative -left-12"
              style={{ transform: "translateY(-2px)" }}
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 mb-2">
                <img src={Career} alt="Career Mentoring" className="w-8 h-8" />
              </div>
              <p className="text-[11px] font-medium text-center px-2">
                Career Mentoring
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-md mx-auto px-4 mt-6 space-y-4">
        {[
          SmartResume,
          ThreeXHigher,
          LightningFast,
          ATSScore,
          JobPlacement,
          Career,
        ].map((img, i) => {
          const labels = [
            "Smart Resume Tailoring",
            "3X Higher Interview Rate",
            "Lightning-Fast Job Matching",
            "ATS Score Optimization",
            "Premium Job Placement",
            "Career Mentoring",
          ];
          return (
            <div
              key={i}
              className="flex items-center bg-[#E6F2FF] rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center justify-center rounded-full w-12 h-12 bg-white mr-4">
                <img src={img} alt={labels[i]} className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">{labels[i]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureBubbles;
