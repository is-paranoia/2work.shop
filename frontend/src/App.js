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
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage/AuthPage";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import OrderPage from "./pages/OrderPage/OrderPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";

function App() {
  //const [loading, setLoading] = useState(true)

  const { token, userId, login, logout, } = useAuth()
  const isAuthenticated = !!token
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
    <AuthContext.Provider value={{
      token: token, login: login, logout: logout, userId: userId, isAuthenticated: isAuthenticated
    }}>
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
                    <Route path="/*" element={
                        <Fragment>
                            <MainPage />
                        </Fragment>
                    }/>
                    <Route path="/orders" element={<OrdersPage />} exact/>
                    <Route path="/auth/login" element={<AuthPage />} exact/>
                    <Route path="/create_order" element={<CreateOrder />} exact/>
                    <Route path="/my-orders" element={<MyOrdersPage />} exact/>
                    <Route path="/orders/:id" element={<OrderPage />} exact/>
                </Routes>
            </div>
            <Footer/>
            
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
