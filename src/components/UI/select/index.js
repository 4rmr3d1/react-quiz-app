import React from 'react'

const Select = ( props ) => {
  const htmlFor = `${props.label}-${Math.random()}`

  return (
    <div className='form-group'>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select
        id={htmlFor}
        className='form-control'
        value={props.value}
        onChange={props.onChange}
      >
        { props.options.map((option, index) => {
          return (
            <option
              key={option.value + index}
              value={option.value}
            >
              {option.text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

export default Select;