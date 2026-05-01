import { formatDate } from "../../../../utils/formatDate";
import PaginationControls from "../PaginationControls";
import BlogPostsCard from "./BlogPostsCard";

const BlogPostsGrid = ({posts, currentPage, totalPages, onPageChange}) => {
    console.log(posts)

  return (
    <div className="h-full">
        <div className="flex flex-col py-4 gap-4 w-full">
            {
                posts?.map((item) => {
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

            {
                posts?.length === 0 && (
                    <div className="w-full flex flex-col items-center py-10">
                        <h3 className="text-xl font-medium">No se encontraron publicaciones para esta categoría.</h3>
                    </div>
                )
            }
        </div>

        <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}/>
    </div>
  );
};

export default BlogPostsGrid;