import vector2 from "../../../../assets/Vector (2).png";
import vector3 from "../../../../assets/Vector (3).png";
import vector4 from "../../../../assets/Vector (4).png";

const Feature = () => {
  return (
    <div className="lg:h-[400px] w-10/12 mx-auto pt-24 bg-gradient-to-r from-[#F9FBFF] via-[#E1EFFF] via-30% to-[#F9FBFF] bg-bo">
      <h1 className="lg:text-[32px] text-2xl text-center">
        You are{" "}
        <span className="text-[#23A2FC] font-bold">90% more likely</span> to get
        hired if you use AIApply
      </h1>

      <div className="grid lg:grid-cols-3 w-full mt-20 bg- space-y-10 lg:space-y-0">
        <div className="flex flex-col items-center text-center">
          <img src={vector2} alt="" className="mb-2" />
          <h1 className="text-[36px] font-bold mb-1">9.1/10</h1>
          <p className="text-[16px]">Quality Improvement Rating</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={vector3} alt="" className="mb-2" />
          <h1 className="text-[36px] font-bold mb-1">5 Hrs</h1>
          <p className="text-[16px]">Editing Hours saved per job</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={vector4} alt="" className="mb-2" />
          <h1 className="text-[36px] font-bold mb-1">10 million</h1>
          <p className="text-[16px]">Jobs our AI is trained on</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
