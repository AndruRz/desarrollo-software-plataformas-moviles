import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChallengeView from './pages/ChallengeView'
import ChallengeDemo from './pages/ChallengeDemo'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desafio/:slug" element={<ChallengeView />} />
        <Route path="/desafio/:slug/demo" element={<ChallengeDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App