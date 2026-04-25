const BlogCommunitySkeleton = () => {
  return (
    <>
        <div className="mt-4 ease-in-out animate-pulse">
            <div className="rounded bg-black/10 dark:bg-white/10 w-1/2 h-8"/>
        </div>
        <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                [1, 2, 3, 4, 5, 6].map((i) => {
                    return (
                        <div
                            key={i}
                            className="h-32 rounded-xl bg-black/10 dark:bg-white/10 ease-in-out animate-pulse"/>
                    )
                })
            }
        </div>
    </>
  );
};

export default BlogCommunitySkeleton;
