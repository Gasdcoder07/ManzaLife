import { Home, Login, Register, Blog } from "./pages/index.js"

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
              </Routes>
          </main>
      </div>
  );
}

export default App
