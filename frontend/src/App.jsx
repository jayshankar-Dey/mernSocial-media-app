import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Profile from "./components/Profile"
import { Toaster } from 'react-hot-toast';
import {useSelector} from "react-redux"
import Chat from "./components/Chat"
import Loading from "./Loading"
import PrivetRoute from "./protectedRout/PrivetRoute"
import PublicRoute from "./protectedRout/PublicRoute"
const App = () => {
  const {loading}=useSelector(state=>state.loading)
  
  return (
    <>
    
    <BrowserRouter>
    <Toaster/>
    
        {loading?<Loading/>:(<Routes>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route path="/chat" element={<PrivetRoute><Chat/></PrivetRoute>} />
        <Route path="/" element={<PrivetRoute><Home/></PrivetRoute>} />
        <Route path="/profile/:id?" element={<PrivetRoute><Profile/></PrivetRoute>} />
        </Routes>)}
       
     
     
    </BrowserRouter>
    </>
  )
}

export default App