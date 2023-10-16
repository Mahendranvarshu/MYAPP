import React from "react";
//import Announcement from "../components2/Announcement";
//import Categories from "../components2/Categories";
//import Footer from "../components2/Footer";
//import Navbar from "../components2/Navbar";
//import Newsletter from "../components2/Newsletter";
import ProductList from "./ProductList";
import Navbar from "../Components/Navbar";
//import Announcement from "../Components/Announcement";
//import Newsletter from "../components/Newsletter";
import Footer from "../Components/Footer";
//import Products from "../components2/Products";
//import Slider from "../components2/Slider";

   

const Home = () => {
  return (
    <div className="div2"  >


     <Navbar/>
    
      <ProductList/>
      
      <Footer/>
    
      
     
    </div>
  );
};

export default Home;
