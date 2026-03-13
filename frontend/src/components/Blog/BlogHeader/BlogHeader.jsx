import PostsGrid from "../../PostsSection/PostsGrid"

const BlogHeader = () => {
  return (
    <section className="bg-zinc-950 text-white min-h-screen py-4 md:py-10 lg:py-12">
      <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-4 md:gap-10 lg:gap-12">

        {/* Input */}
    
        <div className="relative w-full max-w-4xl text-white mt-2">
            <input
                className="bg-white/20 border border-white rounded-xl w-full py-3 pl-5 pr-10 outline-none placeholder-white/50"
                type="text"
                placeholder="Playas, plazas o restaurantes"
            ></input>
        </div>
        
        <PostsGrid/>

      </div>
    </section>
  )
}

export default BlogHeader