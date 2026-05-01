
const DashboardSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 animate-pulse">

        <div className="rounded bg-black/10 dark:bg-white/10 w-1/2 h-8"/>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-black/10 dark:bg-white/10 rounded-xl"/>
            ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
            <div className="xl:col-span-3 h-64 bg-black/10 dark:bg-white/10 rounded-xl"/>
            <div className="xl:col-span-2 h-64 bg-black/10 dark:bg-white/10 rounded-xl"/>
        </div>

    </div>
  );
};

export default DashboardSkeleton;
