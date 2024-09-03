import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import heroImage1 from "../assets/hero-image1.jpg";
import heroImage2 from "../assets/hero-image2.jpg";
import profilePic1 from "../assets/profile1.jpg";
import profilePic2 from "../assets/profile2.jpg";
import profilePic3 from "../assets/profile3.jpg";
import logo1 from "../assets/logo1.png"; // Import the logo image
import Chatbot from "../ChatBot"; // Adjust the path if needed

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch recommendations
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/recommendations",
          {
            method: "POST",
            body: JSON.stringify({ userId: "exampleUserId" }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecommendations(data.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const result = await response.json();

        // Access the 'data' property from the response
        if (result.status && Array.isArray(result.data)) {
          const selectedCategories = result.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setCategories(selectedCategories);
        } else {
          // Log an error if the data format is not as expected
          console.error("Unexpected data format, expected an array:", result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // fetchRecommendations();
    fetchCategories();
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroText>
          <h1>Welcome to Indilink</h1>
          <p>Bridging Traditions, Crafting Connections</p>
          <Link to="/products">
            <ShopButton>Shop Now</ShopButton>
          </Link>
        </HeroText>
        <HeroImageWrapper>
          <HeroImagesWithAnimation>
            <HeroImage src={heroImage1} alt="Hero 1" />
            <HeroImage src={heroImage2} alt="Hero 2" />
          </HeroImagesWithAnimation>
        </HeroImageWrapper>
      </HeroSection>
      <FeaturedSection>
        <SectionTitle>Explore Popular Categories</SectionTitle>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryLink key={category.id}>
              <CategoryCard>{category.category_name}</CategoryCard>
            </CategoryLink>
          ))}
        </CategoryGrid>
      </FeaturedSection>
      <RecommendationsSection>
        <SectionTitle>Recommended For You</SectionTitle>
        <RecommendationGrid>
          {recommendations.map((item) => (
            <RecommendationCard key={item.id}>
              <img
                src={require(`../assets/${item.image}`).default}
                alt={item.name}
              />
              <h3>{item.name}</h3>
            </RecommendationCard>
          ))}
        </RecommendationGrid>
      </RecommendationsSection>
      <TestimonialsSection>
        <h2>What Our Customers Say</h2>
        <TestimonialCard color="#ffbe0b">
          <ProfileImage src={profilePic1} alt="Profile 1" />
          <p>
            "Indilink helped me find authentic Indian handicrafts that remind me
            of home. The quality is exceptional!"
          </p>
          <h3>- Aarti S.</h3>
        </TestimonialCard>
        <TestimonialCard color="#04e762">
          <ProfileImage src={profilePic2} alt="Profile 2" />
          <p>
            "As a seller, Indilink has given me a platform to showcase my
            products to a global audience. My business has grown significantly!"
          </p>
          <h3>- Ramesh K.</h3>
        </TestimonialCard>
        <TestimonialCard color="#008bf8">
          <ProfileImage src={profilePic3} alt="Profile 3" />
          <p>
            "The process was seamless, and the customer service was excellent. I
            received my items on time and in perfect condition."
          </p>
          <h3>- Neha P.</h3>
        </TestimonialCard>
      </TestimonialsSection>
      <Chatbot /> {/* Add the Chatbot component here */}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333; /* Dark gray for text, adjust if needed */
  font-family: "Berlin Sans FB", sans-serif; /* Use the same font as your other components */
  text-align: center; /* Center-align text for a balanced look */
  border-bottom: 2px solid #fb5607; /* Adding a border color to match your theme */
  padding-bottom: 0.5rem;
  display: inline-block; /* Inline-block to apply padding and border effect */
  background: linear-gradient(
    90deg,
    rgba(252, 176, 69, 1) 0%,
    rgba(253, 29, 29, 1) 100%
  ); /* Gradient background */
  -webkit-background-clip: text; /* Text gradient effect */
  -webkit-text-fill-color: transparent; /* Makes text transparent so gradient shows */
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column; /* Ensure children are stacked vertically */
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  padding: 2rem;
  border-radius: 8px;
  color: white;
  min-height: 60vh;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CategoryCard = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
`;

const HeroText = styled.div`
  position: relative; /* Change from absolute to relative */
  z-index: 1;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const ShopButton = styled.button`
  background-color: #ffbe0b;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ff9f1c;
  }
`;

const FeaturedSection = styled.section`
  width: 100%;
  padding: 2rem 0;
`;

const RecommendationsSection = styled.section`
  padding: 2rem 0;
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const RecommendationCard = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  img {
    max-width: 100%;
    border-radius: 4px;
  }
  h3 {
    margin: 1rem 0 0;
    font-size: 1.1rem;
  }
`;

const TestimonialsSection = styled.section`
  display: flex; /* Use flexbox to arrange cards horizontally */
  overflow-x: auto; /* Allow horizontal scrolling if needed */
  padding: 2rem 0;
  gap: 1rem; /* Space between cards */
`;

const TestimonialCard = styled.div`
  background-color: ${(props) => props.color || "#fff"};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px; /* Fixed width for cards */
  height: 200px; /* Fixed height for cards */
  display: flex; /* Use flexbox to center content */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05); /* Bulging effect on hover */
    background-color: ${(props) =>
      props.hoverColor || "#f7f7f7"}; /* Optional: change background on hover */
  }
  p {
    font-style: italic;
    margin: 0;
    text-align: center; /* Center align text */
  }
  h3 {
    margin-top: 0.5rem;
    font-weight: normal;
    text-align: center; /* Center align text */
  }
`;

// Define keyframes for the scroll animation first
const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Define styled components using the keyframes
const HeroImageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden; /* Ensure images don't overflow */
`;

const HeroImagesWithAnimation = styled.div`
  display: flex;
  width: 200%; /* Total width to accommodate both images */
  animation: ${scrollAnimation} 20s linear infinite;
`;

const HeroImage = styled.img`
  width: 50%; /* Each image should take up half of the container width */
  height: auto;
  object-fit: cover;
  flex-shrink: 0; /* Prevent images from shrinking */
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;
