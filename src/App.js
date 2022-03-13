import Login from "./pages/Login"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/sign-up" element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
