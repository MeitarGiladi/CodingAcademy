import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { AppHeader } from './AppHeader';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/mail" element={<EmailIndex />} />
                    </Routes>
                </main>

            </section>
        </Router>

    )
}


