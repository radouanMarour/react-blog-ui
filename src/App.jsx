import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import BlogDetails from './pages/BlogDetails'
import CreatePost from './pages/CreatePost'
import DesktopHeader from './components/DesktopHeader'
import MobileHeader from './components/MobileHeader'
import './App.css'
import ProfilePage from './pages/ProfilePage'
import EditPost from './pages/EditPost'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Router>
        <MobileHeader />
        <DesktopHeader />
        <div className='pages-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='blog/new' element={<CreatePost />} />
            <Route path='/posts/:id' element={<BlogDetails />} />
            <Route path='/posts/edit/:id' element={<EditPost />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </Router>
    </>
  )
}

export default App
