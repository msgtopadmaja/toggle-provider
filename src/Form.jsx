import React, { useState, useContext } from "react";
import UserContext from "./Store";

const Form = ({ mode, currentItem }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useContext(UserContext);

  const handleSave = (e) => {
    e.preventDefault();
    if (name && age) {
      if (mode === "create") {
        //   onSubmit({ name, age: parseInt(age) }); // Call the parent function with the new data
        setData([...data, { id: Math.random(), name, age: parseInt(age) }]);
        setName(""); // Clear the input fields
        setAge("");
      } else if (mode == "edit") {
        console.log("current", JSON.stringify(currentItem)); // we get the data at the point
        const currentItemIndex = data.findIndex(
          (item) => item.id === currentItem.id
        );
        console.log(currentItemIndex, "index =");
        // currentItem.name = newData.name;
        // currentItem.age = newData.age;
        const updatedData = [...data];
        updatedData[currentItemIndex].name = name;
        updatedData[currentItemIndex].age = age;
        console.log(updatedData, "updated");
        setData(updatedData);
      }
    }
  };

  const handleCancel = () => {
    setName(""); // Clear the both name and age input fields
    setAge("");
  };

  return (
    <div className="inputs">
      <form onSubmit={handleSave}>
        <div className="input">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input">
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="buttons-form">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
