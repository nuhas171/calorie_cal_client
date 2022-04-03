import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header from "./components/common/Header";
import ProfilePage from "./pages/Profile";
import RootContext from "./utils/context";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    if(localStorage.getItem("jwt")) {
      setLogin(true)
    }
  }, [])
  
  const storeJwt = (jwt) => {
    if(jwt) {
      localStorage.setItem("jwt", jwt);
      setLogin(true)
    }
  }

  const removeJwt = () => {
    localStorage.removeItem("jwt");
    setLogin(false)
  }

  return (
    <RootContext.Provider value={{
      login: login,
      storeJwt: storeJwt,
      removeJwt: removeJwt
    }}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/user/me" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    </RootContext.Provider>
  );
}

export default App;
