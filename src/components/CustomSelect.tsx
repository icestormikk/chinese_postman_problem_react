interface CustomSelectProps {
  id: string
  hasNotSelectedOption?: boolean
  options: Array<{ value: string, label: string }>
}

function CustomSelect({ id, hasNotSelectedOption = false, options }: CustomSelectProps) {
  return (
    <select name={id} id={id}>
      { hasNotSelectedOption && <option value={undefined}>Не выбрано</option> }
      {
        options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))
      }
    </select>
  );
}

export default CustomSelect;