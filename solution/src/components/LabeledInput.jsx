import React, { useRef } from "react";

import "./LabeledInput.css";

export default function LabeledInput({ label, name, type="text", children, options, defaultValue, onChange, ...props }) {
  const defaultSelectOptionRef = useRef();

  function handleSelectChange(e) {
    if (e.target.value !== "") {
      onChange(e);
      e.target.value = "";
    }
  }

  return (<>
    <label htmlFor={name} className="inline-block col-span-12 sm:col-span-3 sm:text-right sm:pr-3">{label}</label>
    {type === "text" && (
      <input type={type} className="col-span-12 sm:col-span-9 border border-black rounded-sm" name={name} defaultValue={defaultValue} onChange={onChange} {...props}/>
    )}
    {type === "select" && (
      <select name={name} defaultValue="" onChange={handleSelectChange} className="col-span-12 sm:col-span-9 bg-gray-100 border border-black rounded-sm" {...props}>
        <option name="default" ref={defaultSelectOptionRef} disabled={true} value=""></option>
        {options && options.length > 0 && options.map((optionValue, i) => 
          <option key={i} value={optionValue}>{optionValue}</option>
        )}
      </select>
    )}
    <div className="col-span-12 sm:col-start-4 sm:my-1  mb-5">
      {children}
    </div>
  </>);
}