import './index.css'
import ReactSlick from '../ReactSlick'
import NavBar from '../NavBar'
import { BsFilterRight } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

const sortOptions = [
  { id: 'Lowest', label: 'Sort by Lowest' },
  { id: 'Highest', label: 'Sort by Highest' },
]

function Home() {
  const [initialLoading, setInitialLoading] = useState(true)
  const [sortOption, setSortOption] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [restaurantsList, setRestaurantsList] = useState([])
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [offers, setOffers] = useState([])
  const [isOffersLoading, setIsOffersLoading] = useState(true)

  const initialPage = parseInt(localStorage.getItem('activePage'), 10) || 1
  const [activePage, setActivePage] = useState(initialPage)
  const jwtToken = Cookies.get('jwt_token')
  const navigate = useNavigate()

  const limit = 9
  const offset = (activePage - 1) * limit

  // Fetch offers once
  const fetchOffers = async () => {
    const opts = { method: 'GET', headers: { Authorization: `Bearer ${jwtToken}` } }
    try {
      const res = await fetch('https://tasty-kitchen-backend-1.onrender.com/api/offers', opts)
      if (res.ok) {
        const data = await res.json()
        setOffers(data.offers)
        console.log(data.offers)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsOffersLoading(false)
    }
  }

  // Fetch restaurant list (no spinner toggles here)
  const fetchRestaurants = async () => {
  let apiUrl = `https://tasty-kitchen-backend-1.onrender.com/api/restaurants/items?offset=${offset}&limit=${limit}`
  if (searchInput) {
    apiUrl = `https://tasty-kitchen-backend-1.onrender.com/api/restaurants/items?search=${searchInput}&offset=${offset}&limit=${limit}`
  } else if (sortOption) {
    apiUrl = `https://tasty-kitchen-backend-1.onrender.com/api/restaurants/items?sort_by_rating=${sortOption}&offset=${offset}&limit=${limit}`
  }

  const opts = { method: 'GET', headers: { Authorization: `Bearer ${jwtToken}` } }
  try {
    const res = await fetch(apiUrl, opts)
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      setRestaurantsList(data.restaurants)
      setTotalRestaurants(data.total || 0) // ✅ ensure total resets
    } else {
      // ✅ fallback if API fails
      setRestaurantsList([])
      setTotalRestaurants(0)
    }
  } catch (e) {
    console.error(e)
    setRestaurantsList([])      // ✅ clear on failure
    setTotalRestaurants(0)
  }
}


  // Initial load: offers + restaurants
  useEffect(() => {
    const doInitialLoad = async () => {
      setInitialLoading(true)
      await fetchOffers()
      await fetchRestaurants()
      setInitialLoading(false)
    }
    doInitialLoad()
  }, [])

  // On filters / pagination, reload restaurants only
  useEffect(() => {
    if (!initialLoading) {
      localStorage.setItem('activePage', activePage)
      fetchRestaurants()
    }
  },[activePage, sortOption, searchInput])

  // Full-page loader only on initial load or when navigating back
  if (initialLoading) {
    return (
      <div className="page-loader-container">
        <div className="loader"></div>
      </div>
    )
  } 

  return (
    <div>
      <NavBar />
      {!isOffersLoading && <ReactSlick offers={offers} />}

      <div className="popular-restaurants-container">
        <h1 className="popular-heading">Popular Restaurants</h1>
        <div className="sort-container">
          <p className="popular-para">
            Select your favourite restaurant special dish and make your day happy...
          </p>

          <input
            type="search"
            placeholder="Search Restaurants"
            className="search-input"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setActivePage(1)
            }}
          />

          <div className="sort-flex">
            <BsFilterRight className="sort-by-icon" />
            <select
              className="sort-by-select"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value)
                setActivePage(1)
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="hr" />

        <div className="restaurants-list-wrapper">
          {restaurantsList.length > 0 ? (
            <ul className="restaurants-list">
              {restaurantsList.map((rest) => (
                <li
                  key={rest.id}
                  className="restaurant-card"
                  onClick={() => navigate(`/restaurant/${rest.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={rest.image_url}
                    alt={rest.name}
                    className="restaurant-image"
                  />
                  <div>
                    <h3>{rest.name}</h3>
                    <p>{rest.cuisine}</p>
                    <p>
                      ⭐ {rest.user_rating.rating} (
                      {rest.user_rating.total_reviews} ratings)
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">
              <img
                src="https://i.postimg.cc/HnDPpGpD/Screenshot-2025-07-10-at-9-23-34-AM.png"
                alt="No Results"
                className="no-results-image"
              />
            </div>
          )}
        </div>
     {restaurantsList.length > 0 && !searchInput && (
  <div className="pagination-controls">
    <button
      onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
      disabled={activePage === 1}
    >
      {'<'}
    </button>
    <p>{activePage} of {Math.ceil(totalRestaurants / limit)}</p>
    <button
      onClick={() => setActivePage((prev) => prev + 1)}
      disabled={activePage === Math.ceil(totalRestaurants / limit)}
    >
      {'>'}
    </button>
  </div>
)}


      </div>

      <Footer />
    </div>
  )
}

export default Home