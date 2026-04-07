import { Home, Login, Register, BlogHome, BlogCategories, BlogPostDetail, Pruebas, CreatePost, BlogCommunity, BlogProfile, ManzaDle } from "./pages/index.js"
// import { Home, Login, Register, BlogHome, BlogCategories, BlogPostDetail, Pruebas, CreatePost, BlogCommunity, ManzaDle } from "./pages/index.js"
import BlogLayout from "./layouts/BlogLayout.jsx";
import { Routes, Route } from 'react-router-dom'
import AuthLayout from "./layouts/AuthLayout.jsx";

function App() {

  return (
      <div className="font-SnPro antialiased">
          {/* Layout */}
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="blog" element={<BlogLayout />}>
                        <Route index element={<BlogHome />} />
                        <Route path=":slug" element={<BlogPostDetail/>}/>
                        <Route path="categories" element={<BlogCategories/>} />
                        <Route path="community" element={<BlogCommunity/>}/>
                        <Route path="profile/:username" element={<BlogProfile/>}/>
                  </Route>

                  <Route path="/manzadle" element={<ManzaDle />}/>

                  <Route path="/pruebas" element={<Pruebas />} />

                  <Route path="create-post" element={<BlogLayout />}>
                        <Route index element={<CreatePost/>}/>
                  </Route>

                  <Route path="/auth" element={<AuthLayout/>}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                  </Route>
              </Routes>
          </main>
      </div>
  );
}

export default App
