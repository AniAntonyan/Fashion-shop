import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
// import Slides from "./components/slider/Slides";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dasboard/Dashboard";


function App(slides) {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={ <Products/> } />
        <Route path="/login"element={<LoginPage/>}/>
        <Route path="/dashboard"element={<Dashboard/>}/>
    
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

 export default App;

