import {Route, Routes} from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import UserProvider from "./components/UserProvider";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import MainView from "./pages/MainView";


export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<MainView/>}/>
                    <Route path="signUp" element={<SignUp/>}/>
                    <Route path="login" element={<Login />} />
            

                    <Route path="*" element={<p>404 - Page not found</p>}/>
                </Route>
            </Routes>
        </UserProvider>
    )
}