import { IoWarningOutline } from "react-icons/io5";

interface WarningMessageProps {
  message: string
}

const WarningMessage = ({ message }: WarningMessageProps) => {
  return (
    <div className='bg-orange-400 flex justify-start items-center gap-4 p-2 rounded-md text-[#efefef] my-2'>
      <IoWarningOutline size={30}/>
      <span>{message}</span>
    </div>
  );
};

export default WarningMessage;