
import { Route,Routes } from "react-router"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import NotificationPage from "./pages/NotificationPage"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"
import OnboardingPage from "./pages/OnboardingPage"
import { Toaster } from "react-hot-toast"
import { axiosInstance } from "./lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"


const App = () => {

  const {data,isLoading,error} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auth/me')
      return res.data
    },
    retry: false,
  })
  
  const authUser = data?.user



  return (
    <div className='h-screen' data-theme="night">

     <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
      <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to="/" /> } />
     <Route path='/notifaction' element={authUser ?  <NotificationPage /> : <Navigate to="/login"/>} />
    < Route path='/chat' element={authUser ?  <ChatPage /> : <Navigate to="/login"/>} />
    < Route path='/call' element={authUser ?  <CallPage /> : <Navigate to="/login"/>} />
    <Route path='/onboarding' element={authUser ?  <OnboardingPage /> : <Navigate to="/login"/>} />
      </Routes> 
    <Toaster/>

    </div>
    
  )
}

export default App
