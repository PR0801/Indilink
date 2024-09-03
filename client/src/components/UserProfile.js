import React from 'react';
import './App.css';
import { FaTruck } from 'react-icons/fa'; // Import the icon from React Icons

function UserProfile() {
  const handleOrderTracking = () => {
    // Redirect to Indian Post order tracking page
    window.open('https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx', '_blank');
  };

  return (
    <main className="main-content">
      <h1>User Profile</h1>
      <p>Manage your profile, view orders, and update settings.</p>
      <h2>Profile Information</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" />
        <button type="submit" className="btn">Update Profile</button>
      </form>
      <h2>Order History</h2>
      <div className="order-tracking">
        <p>Track your orders:</p>
        <button onClick={handleOrderTracking} className="btn">
          <FaTruck size={24} /> Track Order
        </button>
      </div>
      {/* Add logic to display past orders */}
    </main>
  );
}

export default UserProfile;
