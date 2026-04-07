const PostGridSkeleton = () => {
  return (
    <div className="overflow-x-auto scroll-smooth no-scrollbar">
        <div className="flex gap-8 w-max py-2">
            {
                [1, 2, 3].map((i) => {
                    return (
                        <div className="w-sm rounded-xl bg-white/10 h-124 animate-pulse ease-in-out"/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default PostGridSkeleton;