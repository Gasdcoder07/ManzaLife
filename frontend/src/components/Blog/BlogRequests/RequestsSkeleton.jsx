const RequestsSkeleton = () => {
    return (
        <>
            <div className="mt-4 flex items-center justify-between animate-pulse ease-in-out">
                <div className="rounded bg-black/10 dark:bg-white/10 w-1/2 h-8" />
                <div className="rounded bg-black/10 dark:bg-white/10 w-36 h-8" />
            </div>
            <div className="h-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
                    {[1, 2, 3, 4, 5].map((item) => {
                        return (
                            <div
                                key={item}
                                className="w-full h-48 sm:h-56 bg-black/10 dark:bg-white/10 rounded-xl animate-pulse ease-in-out"
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default RequestsSkeleton;