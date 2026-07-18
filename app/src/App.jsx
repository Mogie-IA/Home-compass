import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { ModalProvider } from './components/ModalContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FormModal from './components/FormModal.jsx'
import Home from './pages/Home.jsx'
import Developers from './pages/Developers.jsx'
import Homeowners from './pages/Homeowners.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import DashboardLayout from './dashboard/DashboardLayout.jsx'
import Overview from './dashboard/pages/Overview.jsx'
import Estates from './dashboard/pages/Estates.jsx'
import Plots from './dashboard/pages/Plots.jsx'
import Documents from './dashboard/pages/Documents.jsx'
import Handover from './dashboard/pages/Handover.jsx'
import Repairs from './dashboard/pages/Repairs.jsx'
import DashHomeowners from './dashboard/pages/Homeowners.jsx'
import Reports from './dashboard/pages/Reports.jsx'
import Settings from './dashboard/pages/Settings.jsx'

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

/* Marketing chrome (nav + footer + pilot modal) wraps the public site only. */
function MarketingLayout() {
  return (
    <ModalProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FormModal />
    </ModalProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollManager />
      <Routes>
        {/* Public marketing site */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/homeowners" element={<Homeowners />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Auth (no chrome) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Developer dashboard */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="estates" element={<Estates />} />
          <Route path="plots" element={<Plots />} />
          <Route path="documents" element={<Documents />} />
          <Route path="handover" element={<Handover />} />
          <Route path="repairs" element={<Repairs />} />
          <Route path="homeowners" element={<DashHomeowners />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  )
}
