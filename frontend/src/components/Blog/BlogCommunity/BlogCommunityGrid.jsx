import BlogCommunityCard from "./BlogCommunityCard";

const BlogCommunityGrid = ({ Users }) => {
  return (
    <div className="h-full">
        <div className="w-full py-4">
            {
                Users.map((user) => {
                    return (
                        <BlogCommunityCard/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default BlogCommunityGrid;