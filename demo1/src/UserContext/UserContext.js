import { createContext, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data, setData] = useState({ name: "John", age: 25 });
  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
