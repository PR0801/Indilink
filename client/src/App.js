import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Home from './components/Home';
import About from './components/About';
import Support from './components/Support';
import UserProfile from './components/UserProfile';
import Checkout from './components/Checkout';
import Registration from './pages/RegisterPage'; 
import SellerDashboard from './pages/SellerDashboard'; 
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard'; 
import ProductsPage from './pages/ProductsPage'; // Import the ProductsPage component
import NavBar from './components/navbar'; 
import { CartProvider } from './context/CartContext';

import './App.css';
import logo from './assets/logo.png'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <header className="header">
            <div className="header-logo">
              <img src={logo} alt="Indilink Logo" className="logo-image" />
            </div>
             <h1 className="header-title">Indilink</h1>
            <p className="slogan">Bridging Traditions, Crafting Connections</p>
            <NavBar />
           </header>
           <main>
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/support" element={<Support />} />
               <Route path="/profile" element={<UserProfile />} />
               <Route path="/checkout" element={<Checkout />} />
               <Route path="/register" element={<Registration />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
               <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/products" element={<ProductsPage />} /> {/* Add Products Page route */}
                <Route path="/cart" element={<CartPage />} />
        
      
              </Routes>
            </main>
            <footer className="footer">
              <p>&copy; 2024 Indilink. All rights reserved.</p>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
