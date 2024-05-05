import { TbAlertOctagon } from "react-icons/tb";

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className='bg-red-600 flex justify-start items-center gap-4 p-2 rounded-md text-[#efefef] my-2'>
      <TbAlertOctagon size={30}/>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;