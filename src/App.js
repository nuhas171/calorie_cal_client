import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header from "./components/common/Header";
import ProfilePage from "./pages/Profile";
import History from "./pages/History"
import RootContext from "./utils/context";
import { useState, useEffect } from 'react';
import DailyFoodMenu from "./pages/DailyFoodMenu";
import MyFoodList from "./pages/MyFoodList";
import Recipe from './pages/Recipe';
import SavedRecipe from './pages/SavedRecipe';
import SearchFood from './pages/SearchFood';


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
      <div className="App" style={{background: "#f5f5f5", height: "100vh"}}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/user/me" element={<ProfilePage />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/food-menu" element={<DailyFoodMenu />} />
            <Route exact path="/my-food-list" element={<MyFoodList />} />
            <Route exact path="/recipe" element={<Recipe />} />
            <Route exact path="/saved-recipe" element={<SavedRecipe />} />
            <Route exact path="/search-food" element={<SearchFood />} />
          </Routes>
        </Router>
      </div>
    </RootContext.Provider>
  );
}

export default App;
