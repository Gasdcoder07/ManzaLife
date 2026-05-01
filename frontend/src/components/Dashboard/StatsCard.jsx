const StatsCard = ({ Icon, Description, Number, Loading }) => {
  return (
    <div className="bg-[#fffbf8] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-5 py-3 flex flex-col gap-4">
        <button className="text-xl bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-500 rounded-full p-1 w-fit">
            <Icon/>
        </button>

        <p>{Description}</p>

        {
            Loading ? (
                <div className="h-6 w-1/2 bg-black/10 dark:bg-white/10 rounded"/>
            ) : (
                <span className="tracking-widest font-semibold">{Number}</span>
            )
        }
    </div>
  );
};

export default StatsCard;
