
import { Route,Routes } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import NotificationPage from "./pages/NotificationPage"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"
import OnboardingPage from "./pages/OnboardingPage"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router"
import PageLoader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthUser"


const App = () => {

 
  const  {isLoading, authUser} = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded;

  if(isLoading) return <PageLoader/>


  return (
    <div className='h-screen' data-theme="night">

     <Routes>
      <Route path='/' element={isAuthenticated && isOnboarded ? ( <HomePage />) : ( <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)} />
      <Route path='/login' element={ !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
      <Route path='/signup' element={ !isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} /> } />
     <Route path='/notifaction' element={isAuthenticated ?  <NotificationPage /> : <Navigate to="/login"/>} />
    < Route path='/chat' element={isAuthenticated ?  <ChatPage /> : <Navigate to="/login"/>} />
    < Route path='/call' element={isAuthenticated ?  <CallPage /> : <Navigate to="/login"/>} />
    <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes> 
    <Toaster/>

    </div>
    
  )
}

export default App

