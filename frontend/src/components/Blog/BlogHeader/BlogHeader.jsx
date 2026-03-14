import BlogNavbar from "../BlogNavbar/BlogNavbar"
import BlogPostsGrid from "../BlogPosts/BlogPostsGrid"

const BlogHeader = () => {
  return (
    <section className="bg-zinc-950 text-white h-screen w-full flex flex-col">
        <BlogNavbar/>

        <div className="flex-1 flex w-full overflow-hidden">
            <div className="hidden sm:flex w-52 border-r border-white">
                Hola
            </div>

            <div className="flex-1 container mx-auto w-full px-6 md:px-12 lg:px-24 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent scroll-smooth">
                <BlogPostsGrid/>
            </div>
        </div>
    </section>
  )
}

export default BlogHeader