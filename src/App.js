import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Session/Home'
import Admin from './Components/AdminConsole/Admin';
import Testing from './Components/Testing/TesingHome';
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AudioSession from './Components/AudioSession/Home';



// Parent component
function App() {
    const [code, setCode] = React.useState('');
    const [allow, setAllow] = React.useState('')

    React.useEffect(() => {
        let code = localStorage.getItem('code');
        if(code)
            setAllow(code)
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if the entered code is a 4-digit numeric value
        if (/^\d{4}$/.test(code)) {
            // Update the state or perform any other action
            setAllow(code)
            localStorage.setItem('code', code)
            console.log('Code submitted:', code);
        } else {
            console.log('Invalid code. Please enter a 4-digit numeric code.');
        }
    };


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
        <div>
            {allow !== "8741" ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter 4-digit Code:
                            <input
                                type="text"
                                value={code}
                                maxLength={4}
                                onChange={(e) => setCode(e.target.value.replace(/\D/, ''))}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div> :
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/about" element={About} />
                        <Route path="/contact" element={Contact} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/testing" element={<Testing />} />
                        <Route path="/audio" element={<AudioSession />} />

                        <Route element={NotFound} />
                    </Routes>
                    {toast()}
                </Router>}
        </div>

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
