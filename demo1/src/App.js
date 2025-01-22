import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext/UserContext";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import GetUser from "./pages/GetUser";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Routes>
            <Route path="/" element={<CreateUser />} />
            <Route path="/update/:id" element={<UpdateUser />} />
            <Route path="/getuser/:id" element={<GetUser />} />
          </Routes>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
