import React, { useState } from "react";

const DynamicForm = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleValueChange = (index, e) => {
    const values = [...inputFields];
    values[index].value = e.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveFields = (index) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  return (
    <>
      <div>
        <h1>Items</h1>
        {inputFields.map((inputField, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                className="border border-red-400 text-black"
                placeholder="Enter your item"
                value={inputField.value}
                onChange={(e) => handleValueChange(index, e)}
              />
              <button
                onClick={handleRemoveFields}
                className="bg-red-600 rounded-lg  p-1 font-bold text-white mt-2 ml-2"
              >
                <span>Delete</span>
              </button>
            </div>
          );
        })}
        <button
          className="bg-green-600 rounded-lg  p-1 font-bold text-white mt-2 ml-2"
          onClick={handleAddFields}
        >
          Add Field
        </button>
      </div>
    </>
  );
};

export default DynamicForm;
