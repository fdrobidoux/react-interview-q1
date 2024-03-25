import React, { useRef } from "react";

export default function LabeledInput({ label, name, type="text", children, options, defaultValue, onChange, ...props }) {
  function handleSelectChange(e) {
    // Triggers the onChange on the select element, but also resets to the default option.
    if (e.target.value !== "") {
      onChange(e);
      e.target.value = "";
    }
  }

  return (<>
    <label htmlFor={name} className="inline-block col-span-12 sm:col-span-2 sm:text-right sm:pr-3">{label}</label>
    {type === "text" && (
      <input type={type} className="col-span-12 sm:col-span-10 border border-black" name={name} defaultValue={defaultValue} onChange={onChange} {...props}/>
    )}
    {type === "select" && (
      <select name={name} defaultValue="" onChange={handleSelectChange} className="col-span-12 sm:col-span-10 bg-gray-100 border border-black" {...props}>
        <option name="default" disabled={true} value=""></option>
        {options && options.length > 0 && options.map((optionValue, i) => 
          <option key={i} value={optionValue}>{optionValue}</option>
        )}
      </select>
    )}
    {/**  */}
    <div className="col-span-12 sm:col-start-3 mb-3 sm:mb-5 sm:mt-1">
      {children}
    </div>
  </>);
}