import { GrFormCheckmark } from "react-icons/gr";

interface SucccessMessageProps {
  message: string
}

const SuccessMessage = ({ message }: SucccessMessageProps) => {
  return (
    <div className='bg-green-600 flex justify-start items-center gap-4 p-2 rounded-md text-[#efefef] my-2'>
      <GrFormCheckmark size={30}/>
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;