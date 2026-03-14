import { usePosts } from "../../../hooks/usePosts";
import { formatDate } from "../../../../utils/formatDate";
import BlogPostsCard from "./BlogPostsCard";

const BlogPostsGrid = () => {
    const posts = usePosts()

  return (
    <div className="h-full">
        <div className="flex flex-col py-4 gap-4 w-full">
            {
                posts.map((item) => {
                    return (
                        <BlogPostsCard
                            key={item.id}
                            Image={item.image}
                            Category={item.category?.name}
                            Title={item.title}
                            Description={item.content}
                            AutorName={item.author.username}
                            AutorAvatar={item.author.profile?.avatar}
                            Date={formatDate(item.created_at)}/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default BlogPostsGrid;