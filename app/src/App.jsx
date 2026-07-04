import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ModalProvider } from './components/ModalContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FormModal from './components/FormModal.jsx'
import Home from './pages/Home.jsx'
import Developers from './pages/Developers.jsx'
import Homeowners from './pages/Homeowners.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Contact from './pages/Contact.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <ModalProvider>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/homeowners" element={<Homeowners />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FormModal />
    </ModalProvider>
  )
}
