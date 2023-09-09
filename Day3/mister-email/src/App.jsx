import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { EmailIndex } from './pages/EmailIndex';

export function App() {

    return (
        <Router>
            <section className='main-app'>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mail" element={<EmailIndex />} />
                    </Routes>
                </main>

            </section>
        </Router>

    )
}


