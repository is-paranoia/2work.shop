import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

import './App.css';
import Header from './components/Header/Header'
import React, {Fragment, useEffect, useState} from "react";
import MainPage from "./pages/MainPage/MainPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import Footer from "./components/Footer/Footer";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import OrderPage from "./pages/OrderPage/OrderPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import authUser from "./store/authUser";
import AdminPage from "./pages/AdminPage/AdminPage";



const App = () => {
  useEffect(() =>{
  }, [])
  const isDesktop = useMediaQuery({
      query: "(min-width: 1224px)"
    });

  const isTablet = useMediaQuery({
      query: "(max-width: 1224px)"
    });

  const isMobile = useMediaQuery({
      query: "(max-width: 786px)"
    });

  const isPortrait = useMediaQuery({
      query: "(orientation: portrait)"
    });

  const isRetina = useMediaQuery({
      query: "(max-resolution: 300dpi)"
    });

  return (
    <Router>
            <div style={{position: "absolute", right: 0, bottom: 0}}>
                { isRetina ? "Retina ":"No retina "}
                { isDesktop ? "Desktop ":"No desktop "}
                { isTablet ? "Tablet ":"No tablet "}
                { isMobile ? "Mobile ":"No mobile "}
                { isPortrait ? "Portrait ":"Landscape "}
            </div>
            <Header/>
            <div className={"content"}>
                <Routes>
                    <Route path="/*" element={<OrdersPage />}/>
                    <Route path="/orders" element={<OrdersPage />} exact/>
                    <Route path="/auth/login" element={<AuthPage />} exact/>
                    <Route path="/orders/create" element={<CreateOrder />} exact/>
                    <Route path="/orders/my" element={<MyOrdersPage />} exact/>
                    <Route path="/orders/:id" element={<OrderPage />} exact/>
                    {authUser.roleId == 2 ? <Route path="/admin" element={<AdminPage />} exact/> : null}
                </Routes>
            </div>
            <Footer/>
            
    </Router>
  );
}

export default App;
