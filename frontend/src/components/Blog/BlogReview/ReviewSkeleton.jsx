const ReviewSkeleton = () => {
    return (
        <div className="mt-4">
            <div className="rounded bg-black/10 dark:bg-white/10 w-1/2 h-8"/>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-4">
                {
                    [1, 2, 3, 4, 5, 6].map((i) => {
                        return (
                            <div
                                key={i}
                                className="w-full h-72 bg-black/10 dark:bg-white/10 rounded-xl animate-pulse ease-in-out"/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ReviewSkeleton;
