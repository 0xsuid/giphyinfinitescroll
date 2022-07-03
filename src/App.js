import { useState, useEffect, useCallback, useRef } from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import GiphyImageList from "./components/GiphyImageList"
import SearchBar from "./components/SearchBar"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [query, setQuery] = useState("cats")
  const [items, setItems] = useState([])
  const [offset, setOffset] = useState(0)
  const observer = useRef()

  const filterUniqueGifs = (gifs) =>
    gifs.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    )

  const fetchGifs = useCallback(() => {
    if (!process.env.REACT_APP_GIPHY_API_KEY) return
    const apiKey = process.env.REACT_APP_GIPHY_API_KEY
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20&offset=${offset}`

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          const uniqueGifs = filterUniqueGifs(result.data)
          setItems((values) => filterUniqueGifs([...values, ...uniqueGifs]))
          setIsLoaded(true)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (errors) => {
          setIsLoaded(false)
          setError(errors)
        }
      )
  }, [offset, query])

  const loader = useCallback((node) => {
    if (!node) return
    // here we handle what happens when user scrolls to last image
    const handleObserver = (entities) => {
      const target = entities[0]
      if (target.isIntersecting && target.intersectionRatio > 0.5) {
        setOffset((x) => x + 20)
      }
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    // initialize IntersectionObserver
    // and attaching to to last image
    observer.current = new IntersectionObserver(handleObserver, options)
    observer.current.observe(node)
  }, [])

  const handleChange = (term) => {
    setIsLoaded(true)
    setItems([])
    setQuery(term)
  }

  useEffect(() => {
    fetchGifs()
  }, [fetchGifs])

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!isLoaded) {
    return <LoadingScreen />
  }
  if (process.env.REACT_APP_GIPHY_API_KEY === "") {
    return <div>GIPHY_API_KEY is required...</div>
  }
  return (
    <div>
      <Container>
        <Box>
          <SearchBar
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
          <GiphyImageList itemData={items} innerRef={loader} />
        </Box>
      </Container>
    </div>
  )
}

export default App
