import { Home, Login, Register, BlogHome, BlogCategories, BlogPostDetail, Pruebas, CreatePost} from "./pages/index.js"
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

                  <Route path="create-post" element={<BlogLayout />}>
                        <Route index element={<CreatePost/>}/>
                  </Route>
              </Routes>
          </main>
      </div>
  );
}

export default App
