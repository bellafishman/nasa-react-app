import {useEffect, useState} from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  /* default is false, no showing modal sidebar*/
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    /* reverts value for showModal state */
    setShowModal(!showModal)
  }

  /* fetch data from API using useEffect hook */
  /* {logic executed} when [dependency array satisfied] */
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      /* cache data to avoid excessive API calls */
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
        
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])
  return (
    <>
     {data ? (<Main data={data} />):  (
      <div className="loadingState">
        <i className="fa-solid fa-rocket"></i>
      </div>
     )}
     {showModal && 
      (<SideBar data={data} handleToggleModal={handleToggleModal} />)}
     
     
     {data && 
      (<Footer data={data} handleToggleModal={handleToggleModal}/>)}
    </> 
  )
}

export default App
