import { Home, Login, Register, ForgotPassword, ResetPassword, BlogHome, BlogCategories, BlogPostDetail, Pruebas, PostForm, EditPostPage, BlogCommunity, BlogProfile, ManzaDle, Dashboard, Requests } from "./pages/index.js"
// import { Home, Login, Register, BlogHome, BlogCategories, BlogPostDetail, Pruebas, CreatePost, BlogCommunity, ManzaDle } from "./pages/index.js"
import BlogLayout from "./layouts/BlogLayout.jsx";
import { Routes, Route } from 'react-router-dom'
import AuthLayout from "./layouts/AuthLayout.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {

  return (
    <ThemeProvider>
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
                            <Route index element={<PostForm mode={"create"}/>}/>
                    </Route>

                    <Route path="edit-post/:slug" element={<BlogLayout/>}>
                        <Route index element={<EditPostPage/>}/>
                    </Route>

                    <Route path="/dashboard" element={<BlogLayout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="requests" element={<Requests/>}/>
                    </Route>

                  <Route path="/auth" element={<AuthLayout/>}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgotpassword" element={<ForgotPassword />} />
                        <Route path="resetpassword" element={<ResetPassword />} />
                  </Route>
              </Routes>
          </main>
      </div>
    </ThemeProvider>
  );
}

export default App
