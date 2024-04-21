import { GrFormCheckmark } from "react-icons/gr";

const CompletedStep = () => {
  return (
    <div className='w-full h-full bg-green-500/80 flex justify-center items-center gap-4 px-2 py-4 rounded-md
    text-white text-xl'>
      <b>Шаг выполнен</b>
      <GrFormCheckmark/>
    </div>
  );
};

export default CompletedStep;