import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import History from "./pages/History";
import InterviewSetup from "./pages/InterviewSetup"
import InterviewSession from "./pages/InterviewSession";
import InterviewResults from "./pages/InterviewResults";
import ProtectedRoute from "./routes/ProtectedRoute";
import {Toaster} from "react-hot-toast";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";


const App = () => {

  const loadUser = useAuthStore(
    (state) => state.loadUser
  );

  useEffect(() => {
    loadUser();
  }, []);
  
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>

      <Route path="/history" element={<History/>}/>


      <Route path="results" element={<InterviewResults/>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>

      <Route
 path="/interview/setup"
 element={
  <ProtectedRoute>
   <InterviewSetup />
  </ProtectedRoute>
 }
/>

<Route
 path="/interview/session"
 element={
  <ProtectedRoute>
    <InterviewSession />
  </ProtectedRoute>
 }
/>

    </Routes>
    </BrowserRouter>
  )
}

export default App;