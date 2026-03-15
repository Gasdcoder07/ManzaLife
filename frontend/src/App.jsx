import { Home, Login, Register, BlogHome, Pruebas} from "./pages/index.js"
import BlogLayout from "./layouts/BlogLayout.jsx";
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

                  <Route path="/blog" element={<BlogLayout />}>
                      <Route index element={<BlogHome />} />
                      <Route path="crear" element={<>Categorias papus</>} />
                     
                  </Route>

                  <Route path="/pruebas" element={<Pruebas />} />
              </Routes>
          </main>
      </div>
  );
}

export default App
