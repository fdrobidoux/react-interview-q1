import { useEffect, useRef, useState } from 'react';
import LabeledInput from './components/LabeledInput';
import TableData from './components/TableData';
import FormButtons from './components/FormButtons';

import logo from './logo.svg';
import './App.css';

import { isNameValid, getLocations } from "./mock-api/apis";

function App() {
  const nameRef = useRef();
  const locationAddRef = useRef();

  const [name, setName] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    getLocations().then(x => {
      setAllLocations(x);
    });
  }, [])

  const [nameError, setNameError] = useState(null);

  useEffect(() => {
    async function validateName() {
      if (name && name.trim() !== "") {
        let isValid = await isNameValid(name);
        if (!isValid) {
          setNameError("The name is invalid.");
        }
      } else {
        setNameError("The name is invalid.");
      }
    }

    validateName();
  }, [name]);

  function onChangeLocationToAdd(e) {
    const value = e.target.value;
    console.log(value);
    if (selectedLocations.findIndex(x => x === value) === -1) {
      const updatedSelectedLocations = Array.from(selectedLocations);
      updatedSelectedLocations.push(value);
      setSelectedLocations(updatedSelectedLocations);
      console.log(updatedSelectedLocations);
    }
  }

  function onSelectedLocationsChange(e) {
    const targetSelectedOptions = Array.from(e.target.selectedOptions);
    console.log("Hello");
    const updatedSelectedLocations = Array.from(selectedLocations);
    targetSelectedOptions.forEach(option => {
      const index = updatedSelectedLocations.findIndex((item) => item === option.value);
      updatedSelectedLocations.splice(index, 1);
    });
    setSelectedLocations(updatedSelectedLocations);
    e.target.selectedIndex = -1;
  }

  function addHandler() {

  }

  function clearHandler() {
    
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <LabeledInput label="Name" name="name" defaultValue={name} onChange={(x) => setName(x.target.value)}>
          {nameError != null && (
            <p className="text-red-500">{nameError}</p>
          )}
        </LabeledInput>
        <LabeledInput label="Location" name="locationAdd" type="select" defaultValue={name} options={allLocations} onChange={onChangeLocationToAdd}>
          <select className="w-1/2 col-span-12 no-scrollbar border border-black rounded-sm" name="locations" multiple onChange={onSelectedLocationsChange}>
            {selectedLocations && selectedLocations.map((location, i) => (
              <option key={i} value={location}>{location}</option>
            ))}
          </select>
        </LabeledInput>
      </div>
      <FormButtons addHandler={addHandler} clearHandler={clearHandler} />
      <TableData />
    </div>
  );
}

export default App;
