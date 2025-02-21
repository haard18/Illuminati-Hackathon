
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SpotifyCallback from './components/Callback'
import EventPage from './pages/EventPage'
function App() {
 

  return (
    <>
   
     <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="callback" element={<SpotifyCallback/>} />
          <Route path="/event" element={<EventPage/>} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
