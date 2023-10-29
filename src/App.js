import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home'
import Admin from './Components/AdminConsole/Admin';
import Testing from './Components/TesingHome';
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



// Parent component
function App() {

    const toast = () => {
        return (
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable={false}
                pauseOnHover={false}
                theme="colored"
                closeButton={null}
            />
        );
    };


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/testing" element={<Testing />} />

                <Route element={NotFound} />
            </Routes>
            {toast()}
        </Router>
    );
}

// Other child components
function About() {
    return <h2>About Component</h2>;
}

function Contact() {
    return <h2>Contact Component</h2>;
}

function NotFound() {
    return <h2>404 - Not Found</h2>;
}

export default App;
