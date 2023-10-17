import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home'
import Admin from './Components/AdminConsole/Admin';
import './App.css'


// Parent component
function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />

                    <Route path="/about" element={About} />
                    <Route path="/contact" element={Contact} />
                    <Route path="/admin" element={<Admin/>} />

                    <Route element={NotFound} />
                </Routes>
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
