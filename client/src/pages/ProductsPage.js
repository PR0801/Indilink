import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard'; 
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../components/common/baseUrl';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(baseUrl+'/api/products');
        const data = await response.json();
        console.log('Fetched Products:', data); // Debug log
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(baseUrl+'/api/categories');
        const data = await response.json();
        console.log('Fetched Categories:', data); // Debug log
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-low-high') {
      return a.price - b.price;
    } else if (sortOption === 'price-high-low') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (filterOption === '') return true;
    return product.category === filterOption;
  });

  return (
    <ProductsContainer>
      <Header>
        <h1>All Products</h1>
        <CartIcon onClick={() => navigate('/cart')}>
          <FaShoppingCart size={24} />
        </CartIcon>
      </Header>
      <FilterSortContainer>
        <Filter>
          <label htmlFor="filter">Filter by Category:</label>
          <select
            id="filter"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </Filter>
        <Sort>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </Sort>
      </FilterSortContainer>
      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default ProductsPage;

const ProductsContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(
    90deg,
    rgba(224, 178, 255, 0.6) 0%,
    rgba(255, 230, 230, 0.6) 50%,
    rgba(255, 199, 120, 0.6) 100%
  );
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartIcon = styled.div`
  cursor: pointer;
`;

const FilterSortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Filter = styled.div`
  label {
    margin-right: 0.5rem;
    font-weight: bold;
  }

  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const Sort = styled.div`
  label {
    margin-right: 0.5rem;
    font-weight: bold;
  }

  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;
