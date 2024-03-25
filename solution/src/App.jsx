import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LabeledInput from './components/LabeledInput';
import TableData from './components/TableData';
import FormButtons from './components/FormButtons';
import Spinner from "./components/Spinner";

import logo from './logo.svg';
import './App.css';

import { isNameValid, getLocations } from "./mock-api/apis";

// Stored entries can be retrieved at module resolution time.
const storedRows = JSON.parse(localStorage.getItem("storedData")) || [];

function App() {
  const [name, setName] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [data, setData] = useState(storedRows);

  const [allLocations, setAllLocations] = useState([]);

  // This will only be executed once and it won't be recomputed afterwards.
  useMemo(() => {
    getLocations().then(x => {
      setAllLocations(x);
    });
  }, [])

  const [isValidating, setIsValidating] = useState(null);
  const [nameError, setNameError] = useState(null);

  function onChangeNameInput(e) {
    setIsValidating(false);
    setName(e.target.value);
  }

  useEffect(() => {
    let cancelled = false;
    // Necessary so we don't validate when the fields are left empty intentionally.
    if (isValidating === null) return;
    setIsValidating(true);
    setNameError(null);
    // Why wouldn't you validate trimmed data? It'll be trimmed later when added!
    let trimmedName = name?.trim() ?? "";
    if (trimmedName !== "") {
      isNameValid(trimmedName).then(isValid => {
        if (!cancelled) {
          if (!isValid) {
            setNameError("The name is invalid.");
          } else {
            setNameError(null);
          }
          setIsValidating(false);
        }
      });
    } else {
      setNameError("The name is invalid.");
      setIsValidating(false);
    }
    
    // Using this return statement, I can cancel the previous API call if it's slower than the current one.
    return () => {
      cancelled = true;
    };
  }, [name])

  function onChangeLocationToAdd(e) {
    const value = e.target.value;
    if (selectedLocations.findIndex(x => x === value) === -1) {
      const updatedSelectedLocations = Array.from(selectedLocations);
      updatedSelectedLocations.push(value);
      setSelectedLocations(updatedSelectedLocations);
      console.log(updatedSelectedLocations);
    }
  }

  function onSelectedLocationsChange(e) {
    const targetSelectedOptions = Array.from(e.target.selectedOptions);
    const updatedSelectedLocations = Array.from(selectedLocations);
    // In case we select multiple in one click, by holding the left mouse button,
    // they will all get removed when releasing the left mouse button.
    targetSelectedOptions.forEach(option => {
      const index = updatedSelectedLocations.findIndex((item) => item === option.value);
      updatedSelectedLocations.splice(index, 1);
    });
    setSelectedLocations(updatedSelectedLocations);
    // Sets the selected option to the default value.
    e.target.selectedIndex = -1;
  }

  function addHandler() {
    // Check if validating value is null, and assume that's wrong.
    if (isValidating === null) {
      setNameError("The name is invalid.");
    } else if (!isValidating && !nameError && selectedLocations.length > 0) {
      const newData = Array.from(data);
      newData.push({
        name: name.trim(),
        location: selectedLocations.join(", ")
      });
      setData(newData);
      setName("");
      setNameError(null);
      setSelectedLocations([]);
      setIsValidating(null);
      // I like to use localStorage so I can keep testing after a page refresh.
      localStorage.setItem("storedData", JSON.stringify(newData));
    }
  }

  function clearHandler() {
    setData([]);
    localStorage.setItem("storedData", "[]");
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-12">
        <LabeledInput label="Name" name="name" value={name} onChange={onChangeNameInput}>
          {nameError != null && (
            <p className="text-red-500">{nameError}</p>
          )}
          {isValidating && <Spinner />}
        </LabeledInput>
        <LabeledInput label="Location" name="locationAdd" type="select" defaultValue={name} options={allLocations} onChange={onChangeLocationToAdd}>
          <select className="w-full sm:w-1/2 no-scrollbar border border-black mt-1 sm:mt-0" name="locations" multiple onChange={onSelectedLocationsChange}>
            {selectedLocations && selectedLocations.map((location, i) => (
              <option key={i} value={location}>{location}</option>
            ))}
          </select>
        </LabeledInput>
      </div>
      <FormButtons handleAdd={addHandler} handleClear={clearHandler} />
      <TableData data={data} />
    </div>
  );
}

export default App;
