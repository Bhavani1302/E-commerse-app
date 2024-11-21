import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    priceRange: [0, 1000],
    priceSort: '',
  });
  const [tempFilter, setTempFilter] = useState({
    priceRange: [0, 1000],
    priceSort: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempFilter((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], Number(event.target.value)],
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Apply search filter immediately as the user types
    let filtered = [...products];

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= tempFilter.priceRange[0] && product.price <= tempFilter.priceRange[1]
    );

    // Apply sorting based on price
    if (tempFilter.priceSort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (tempFilter.priceSort === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredProducts(filtered);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= tempFilter.priceRange[0] && product.price <= tempFilter.priceRange[1]
    );

    // Apply sorting based on price
    if (tempFilter.priceSort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (tempFilter.priceSort === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredProducts(filtered);
    setFilter(tempFilter);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: any) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    setAddedToCart((prevState) => ({ ...prevState, [product.id]: true }));

    setTimeout(() => {
      setAddedToCart((prevState) => ({ ...prevState, [product.id]: false }));
    }, 2000);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-100">
        {/* Filter Sidebar */}
        <div className="w-1/4 bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <input
              type="range"
              name="priceRange"
              id="priceRange"
              min="0"
              max="1000"
              step="10"
              value={tempFilter.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="w-full mt-1"
            />
            <span className="text-gray-600">{`$${tempFilter.priceRange[0]} - $${tempFilter.priceRange[1]}`}</span>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
          >
            Apply Filters
          </button>
        </div>

        {/* Products List */}
        <div className="w-3/4 p-6 relative">
          <h1 className="text-2xl font-bold mb-6">Products</h1>

          <button
            onClick={goToCart}
            className="absolute top-6 right-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Go to Cart
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length === 0 ? (
              <p>No products found with the selected filters.</p>
            ) : (
              currentProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <div className="flex flex-col flex-grow justify-between">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-xl font-bold mt-2">${product.price}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={addedToCart[product.id]}
                    className={`mt-4 w-full py-2 rounded-md transition ${
                      addedToCart[product.id]
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {addedToCart[product.id] ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
