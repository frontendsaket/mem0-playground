import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '@/components/navbar';
import Auth from "@/pages/auth";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT}>
      <Navbar />
      <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="*" element={<Home />} /> */}
          </Routes>
      </Router>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
