import {Route, Routes} from "react-router-dom";
import './App.css'
import Layout from "./Layout";
import UserProvider from "./components/UserProvider";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import MainView from "./pages/MainView";
import Basket from "./pages/Basket";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";


export default function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<MainView/>}/>
                    <Route path="register" element={<SignUp/>}/>
                    <Route path="login" element={<Login />} />
                    {/* <Route path="payment" element={<p>Payment Page</p>} />
                    <Route path="login/restorePassword" element={<p>Restore Password Page</p>} /> */}
                    <Route path="/products" element={<MainView/>}/>
                    <Route path="/products/:productId" element={<Product />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/favorite" element={<Favorites />} />

                    <Route path="*" element={<p>404 - Page not found</p>}/>
                </Route>
            </Routes>
        </UserProvider>
    )
}