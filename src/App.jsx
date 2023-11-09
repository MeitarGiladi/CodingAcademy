import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'


export function App() {

    return (
        <Router>

            <main className='main-app'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/mail/:folderName/:emailId?" element={<EmailIndex />} />
                </Routes>
            </main>

        </Router>

    )
}


