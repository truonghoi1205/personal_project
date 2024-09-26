import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import store from './Redux/store';
import Login from "./Pages/auth/Login";
import MainLayout from "./Layout/MainLayout";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<MainLayout/>}>
                    </Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
