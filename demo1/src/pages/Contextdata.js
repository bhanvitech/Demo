import React, { useContext } from "react";
import UserContext from "../UserContext/UserContext";

const ContextData = () => {
  const { data, setData } = useContext(UserContext);
  const updateUser = () => {
    setData({ name: "Product", age: Math.random() });
  };
  return (
    <div>
      <h1>User Info</h1>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
};

export default ContextData;
