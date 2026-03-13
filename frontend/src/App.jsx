import { Home, Login, Register, Blog, Pruebas } from "./pages/index.js"

import { Routes, Route } from 'react-router-dom'

function App() {

  return (
      <div className="font-SnPro antialiased">
          {/* Layout */}
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/pruebas" element={<Pruebas />} />

              </Routes>
          </main>
      </div>
  );
}

export default App
