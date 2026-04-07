import PostItem from "./PostItem";
import { usePosts } from "../../hooks/usePosts"
import { formatDate } from "../../../utils/formatDate"
import PostGridSkeleton from "./PostGridSkeleton";

const PostsGrid = () => {
    const {posts, loading} = usePosts();

    if (loading) return <PostGridSkeleton/>

    return (
      <div className="overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex gap-8 w-max py-2">
            {
                posts.map((post) => {
                    return (
                        <PostItem
                            key={post.id}
                            Image={post.image}
                            Category={post.category_name}
                            Title={post.title}
                            Description={post.summary}
                            Slug={post.slug}
                            AutorName={post.author_name}
                            AutorAvatar={post.author_avatar}
                            Date={formatDate(post.created_at)}/>
                    )
                })
            }
          </div>
      </div>
  );
};

export default PostsGrid;