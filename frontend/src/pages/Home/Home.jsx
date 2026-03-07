import { useState, useEffect } from "react";
import { Header, BlogSection, CategoriesSection, TestimonialsSection, Footer } from "../../components/index"

export default function Home() {
    const [publicacion, setPub] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/")
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Header/>
            <BlogSection/>
            <CategoriesSection/>
            <TestimonialsSection/>
            <Footer/>
        </>
    );
}

// {
//     publicacion.map((post) => (
//         <div key={post.title} className="bg-white/10 p-4 rounded-xl">
//             <h2 className="text-2xl font-bold">{post.title}</h2>
//             <p>{post.content}</p>
//         </div>
//     ));
// }