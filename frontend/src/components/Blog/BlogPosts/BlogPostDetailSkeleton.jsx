const BlogPostDetailSkeleton = () => {
  return (
    <div className="bg-black/5 dark:bg-white/5 m-4 flex flex-col gap-4 p-4 h-full animate-pulse ease-in-out rounded-lg shadow-md">
        <div className="rounded-xl h-64 w-full bg-black/10 dark:bg-white/10"/>

        <div className="flex flex-col gap-6">
            <div className="h-8 w-3/4 rounded bg-black/10 dark:bg-white/10"/>

            <div className="flex items-center gap-4">
                <div className="size-10 bg-black/10 dark:bg-white/10 rounded-full" />
                <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded" />
            </div>

            <div className="flex flex-col gap-2">
                <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
                <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded" />
                <div className="h-4 w-4/6 bg-black/10 dark:bg-white/10 rounded" />
                <div className="h-4 w-3/6 bg-black/10 dark:bg-white/10 rounded" />
            </div>
        </div>
    </div>
  );
};

export default BlogPostDetailSkeleton;