import { Home, Login, Register, BlogHome, BlogCategories, BlogPostDetail, Pruebas} from "./pages/index.js"
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

                  <Route path="blog" element={<BlogLayout />}>
                        <Route index element={<BlogHome />} />
                        <Route path=":slug" element={<BlogPostDetail/>}/>
                        <Route path="categories" element={<BlogCategories/>} />
                  </Route>

                  <Route path="/pruebas" element={<Pruebas />} />
                  <Route path="/posts" element={<Posts />} />

              </Routes>
          </main>
      </div>
  );
}

export default App
