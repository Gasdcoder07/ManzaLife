import BlogCommunityCard from "./BlogCommunityCard";
import DefaultAvatar from "../../../../imgs/DefaultAvatar.webp";

const BlogCommunityGrid = ({ Users }) => {
  return (
    <div className="h-full">
        <div className="w-full py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                Users.map((user) => {
                    return (
                        <BlogCommunityCard
                            key={user.id}
                            Avatar={user?.avatar || DefaultAvatar}
                            FirstName={user.first_name}
                            LastName={user.last_name}
                            Username={user.username}
                            Bio={user.bio}/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default BlogCommunityGrid;