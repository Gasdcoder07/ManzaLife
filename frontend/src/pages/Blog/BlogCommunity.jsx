import BlogCommunityGrid from "../../components/Blog/BlogCommunity/BlogCommunityGrid";

const BlogCommunity = () => {
  return (
    <>
        <div className="mt-4">
                <h3 className="text-2xl font-light">
                    Explora nuestra{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                        comunidad
                    </span>
                </h3>
        </div>
        <BlogCommunityGrid Users={[1, 2, 3, 4, 5]}/>
    </>
  );
};

export default BlogCommunity;