import { formatDate } from "../../../../utils/formatDate";
import BlogPostsCard from "./BlogPostsCard";

const BlogPostsGrid = ({posts}) => {
  return (
    <div className="h-full">
        <div className="flex flex-col py-4 gap-4 w-full">
            {
                posts.map((item) => {
                    return (
                        <BlogPostsCard
                            key={item.id}
                            Image={item.image}
                            Category={item.category_name}
                            Title={item.title}
                            Description={item.summary}
                            Slug={item.slug}
                            AutorName={item.author_name}
                            AutorAvatar={item.author_avatar}
                            Date={formatDate(item.created_at)}/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default BlogPostsGrid;