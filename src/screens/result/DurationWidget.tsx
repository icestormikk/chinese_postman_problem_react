import { AiOutlineClockCircle } from "react-icons/ai"

interface DurationWidgetProps {
  duration: number
}

const DurationWidget = ({ duration }: DurationWidgetProps) => {
  return (
    <div className='bg-gray-300 rounded-xl shadow-md p-2 w-fit flex justify-center items-center gap-2'>
      <AiOutlineClockCircle size={30}/>
      <span>{`${duration} мс`}</span>
    </div>
  )
}

export default DurationWidget