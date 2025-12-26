import { useDispatch,useEffect } from 'react'
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import AdminDashboard from './Dashboard/AdminDashboard'
import UserDashboard from './Dashboard/UserDashboard'
import MainLayout from './Components/CommonComponents/MainLayout'
import EventDetailsPage from './Pages/EventDetailsPage'
import { useSelector } from 'react-redux'
import EventsPage from './Pages/EventsPage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'





function App() {

 
  // const dispatch = useDispatch();
  const isAuthenticated=useSelector((state)=> state.auth.isAuthenticated)

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     dispatch(setLoading(true));
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         // Verify token with your backend or decode it to extract user information
  //         const response = await axios.get('/verifyToken', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });

  //         if (response.data.isAuthenticated) {
  //           dispatch(loginSuccess(response.data.user));
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error checking auth status:', error);
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };

  //   checkAuthStatus();
  // }, [dispatch]);
 
  return (
    <>
      <BrowserRouter>
    
      <Routes>
      {/* Routes without Header and Footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {isAuthenticated ? (
          <>
            <Route path="/eventDetails/:id" element={<EventDetailsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
           
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Route>
    </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
