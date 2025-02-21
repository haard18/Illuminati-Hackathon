
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SpotifyCallback from './components/Callback'
import EventPage from './pages/EventPage'
import Events from './pages/AllEvents'
import Tickets from './pages/TicketPage'
function App() {
 

  return (
    <>
   
     <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="callback" element={<SpotifyCallback/>} />
          <Route path="/event/:id" element={<EventPage/>} />
          <Route path="/allevent" element={<Events/>} />
          <Route path="/ticket" element={<Tickets/>} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
