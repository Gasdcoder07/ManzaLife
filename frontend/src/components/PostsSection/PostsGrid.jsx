import PostItem from "./PostItem";
import { usePosts } from "../../hooks/usePosts"
import { formatDate } from "../../../utils/formatDate"

const PostsGrid = () => {
    const posts = usePosts();

  return (
      <div className="overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex gap-8 w-max py-2">
            {
                posts.map((post) => {
                    return (
                        <PostItem
                            key={post.id}
                            Image={post.image}
                            Category={post.category?.name}
                            Title={post.title}
                            Description={post.content}
                            AutorName={post.author.username}
                            AutorAvatar={post.author.profile?.avatar}
                            Date={formatDate(post.created_at)}/>
                    )
                })
            }
          </div>
      </div>
  );
};

export default PostsGrid;