import React from 'react';
import styled from 'styled-components';
import logo1 from '../assets/logo1.png'; // Import the logo image
import './App.css';

const About = () => {
  return (
    <AboutContainer>
      <main className="main-content">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Indilink</strong>, a unique platform dedicated to connecting the global Indian diaspora with the rich and diverse craftsmanship of local artisans in India. Our mission is to bridge the gap between the Indian community abroad and the traditional artisans of India, ensuring that quality products and authentic cultural experiences are accessible to everyone, no matter where they are in the world.
        </p>
        <h2>Our Mission</h2>
        <p>
          At Indilink, we understand the challenges faced by the Indian diaspora when it comes to accessing traditional products and connecting with their cultural roots. Many are often left searching for reliable sources of high-quality Puja Samagri, traditional attires, and handcrafted items, while local artisans struggle with limited resources and high transportation costs. Our platform aims to solve these issues by providing a seamless connection between buyers and sellers, ensuring quality assurance and reasonable transit costs.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>A Diverse Range of Products:</strong> From Puja Samagri to Handicrafts, Traditional Jewelry, and Sweets, our platform offers a wide variety of products that cater to your cultural and personal needs. Discover unique items like Terracotta Arts, Indian Spices, Ayurvedic Products, and more.</li>
          <li><strong>Global Reach with Local Touch:</strong> We cover around 219 countries, offering a bridge between the Indian diaspora and local artisans across India. Our platform integrates global diaspora data to personalize product recommendations and enhance your shopping experience.</li>
          <li><strong>Quality Assurance:</strong> We prioritize quality by verifying products and sellers before they reach you. Our commitment to quality ensures that you receive authentic and high-quality items every time.</li>
          <li><strong>Seasonal and Cultural Relevance:</strong> Whether it’s a wedding ceremony, festival needs, or seasonal preferences, Indilink is designed to cater to the specific cultural and traditional requirements of our users.</li>
          <li><strong>Support for Local Artisans:</strong> By connecting global buyers with local artisans, we support small businesses and preserve traditional crafts, promoting fair trade and sustainable practices.</li>
        </ul>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Authenticity:</strong> We strive to provide genuine products that reflect the rich cultural heritage of India.</li>
          <li><strong>Quality:</strong> Our rigorous quality checks ensure that every item meets high standards before it reaches you.</li>
          <li><strong>Connection:</strong> We believe in fostering a deep connection between the Indian diaspora and their roots, enhancing the global cultural exchange.</li>
          <li><strong>Sustainability:</strong> We support eco-friendly practices and sustainable products to protect our environment and promote ethical consumption.</li>
        </ul>
        <h2>Join Us</h2>
        <p>
          Become a part of the Indilink community and experience the vibrant culture of India from anywhere in the world. Whether you're looking for traditional attire, exquisite handicrafts, or unique gifts, Indilink is your gateway to a world of authentic Indian products and traditions.
        </p>
        <p>
          Explore our categories, discover new favorites, and stay connected with your cultural heritage. Welcome to Indilink – where tradition meets innovation.
        </p>
      </main>
    </AboutContainer>
  );
}

export default About;

const AboutContainer = styled.div`
  padding: 2rem;
  position: relative;
  background-image: url(${logo1});
  background-repeat: no-repeat;
  background-size: contain; /* Make the logo fit within the container without stretching */
  background-position: center; /* Center the logo */
  background-color: rgba(255, 255, 255, 0.2); /* 80% transparency */
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
  background-attachment: fixed; /* Keep the background in place when scrolling */
`;
