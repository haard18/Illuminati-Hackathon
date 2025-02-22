
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SpotifyCallback from './components/Callback'
import EventPage from './pages/EventPage'
import Events from './pages/AllEvents'
import Tickets from './pages/TicketPage'
import EventForm from './pages/EventForm'
import Dashboard from './pages/Dashboard'
import StadiumSeating from './components/StadiumSeating'
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
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/form" element={<EventForm/>} />
          <Route path='/stadium' element={<StadiumSeating/>}/>
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
