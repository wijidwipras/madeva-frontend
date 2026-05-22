import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* TODO: Add protected routes after authentication is implemented */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
