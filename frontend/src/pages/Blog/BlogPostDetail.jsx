import { useParams } from "react-router";
import { usePost } from "../../hooks/usePosts";
import { formatDate } from "../../../utils/formatDate";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"
import CommentSection from "../../components/CommentsSection/CommentSection";
import BlogPostDetailSkeleton from "../../components/Blog/BlogPosts/BlogPostDetailSkeleton";

const BlogPostDetail = () => {
    const { slug } = useParams();
    const { post, loading } = usePost(slug);

    // if (!post) return <p className="mt-4">No se pudo cargar la publicación</p>
    if (loading) return <BlogPostDetailSkeleton/>

    console.log(post);

  return (
    <div className="mt-4 flex flex-col gap-4 py-4">
        <div className="rounded-xl overflow-hidden h-64">
            <img
                className="object-cover h-full w-full"
                src={post?.image}
                alt={post?.title} />
        </div>
        <div>
            <div className="flex flex-col gap-8">
                <h3 className="font-bold text-2xl sm:text-3xl tracking-wide">{post.title}</h3>
                <div className="w-fit flex justify-between items-center gap-4 text-sm">
                    <div className="flex gap-4 justify-center items-center">
                        <img
                            className="rounded-full size-10 object-cover"
                            src={post.author.avatar ? post.author.avatar : DefaultAvatar}
                            alt={post.author.username} />
                        <span>{post.author.username}</span>
                    </div>

                    <span>{formatDate(post.created_at)}</span>
                </div>

                <p className="whitespace-pre-line text-lg font-light tracking-wider leading-relaxed">{post.content}</p>
            </div>
        </div>
        <div className="my-8 max-w-xl">
            <CommentSection postId={post.id} comments={post.comments}/>
        </div>
    </div>
);
};

export default BlogPostDetail;