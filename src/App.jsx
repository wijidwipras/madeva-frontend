import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Medeva - Room Category Management
          </h1>
          <p className="text-gray-600">Vite + React + Tailwind CSS ready!</p>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
