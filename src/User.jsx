import React, { useContext, useState } from "react";
import ListItem from "./ListItem";
import ToggleStatus from "./ToggleStatus";
import Form from "./Form";
import AddUser from "./AddUser";
import UserContext from "./Store";

const User = () => {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [data, setData] = useContext(UserContext);
  // console.log(data, "provideadnwje");
  const [displayForm, setDisplayForm] = useState(false);
  const [mode, setMode] = useState("create");
  const [currentItem, setCurrentItem] = useState("");

  const handleToggleChange = (status) => {
    // console.log(status,'current status');
    setToggleStatus(status);
  };
  // console.log(toggleStatus, "togglestatus"); // inital false -> on -> true (togglestatus)

  const handleFormSubmit = (newData) => {
    if (mode == "create") {
      newData.id = Math.random();
      setData([...data, newData]);
    } else if (mode == "edit") {
      console.log("current", JSON.stringify(currentItem)); // we get the data at the point
      const currentItemIndex = data.findIndex(
        (item) => item.id === currentItem.id
      );
      console.log(currentItemIndex, "index =");
      // currentItem.name = newData.name;
      // currentItem.age = newData.age;
      const updatedData = [...data];
      updatedData[currentItemIndex].name = newData.name;
      updatedData[currentItemIndex].age = newData.age;
      console.log(updatedData, "updated");
      setData(updatedData);
    }
  };

  const handleAddNewUser = () => {
    setDisplayForm(true);
    setMode("create");
  };

  const handleEdit = (id) => {
    const findData = data.filter((item) => {
      console.log(item);
      return item.id === id;
    });

    console.log("finddata", findData);
    // setDisplayForm(true);
    setCurrentItem(...findData);
    setMode("edit");
    console.log(id);
  };

  return (
    <>
      {displayForm && <Form mode={mode} currentItem={currentItem} />}
      <div className="user-container">
        <AddUser onClick={handleAddNewUser} />
        <ToggleStatus
          toggleStatus={toggleStatus}
          onChange={handleToggleChange}
        />
      </div>
      <div className="item-list">
        {toggleStatus ? (
          <div>
            <ListItem onEdit= {handleEdit} />
          </div>
        ) : (
          <div className="toggle">Toggle is off</div>
        )}
      </div>
    </>
  );
};

export default User;
