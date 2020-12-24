import classes from './Select.module.css';

const Select = ({ options, onChange, placeholder}) => {

  return(
    <select placeholder='Откуда' className={classes.select} onChange={onChange} required>
      <option value=''>{placeholder}</option>
      {options.map(op => <option key={op.id} value={op.id}>{op.cyrilName}</option>)}
    </select>
  )
};

export default Select;