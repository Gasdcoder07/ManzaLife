const RequestItem = ({ type, title, description }) => {
    return (
        <div className="bg-[#fffbf8] dark:bg-[#0d0d0f] rounded-xl border border-neutral-300 dark:border-neutral-800 p-4 flex flex-col gap-6 w-full hover:border-neutral-400 dark:hover:border-neutral-700">
            <div className="flex flex-col gap-2">
                <span>{type}</span>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <span className="text-yellow-500 text-center">Pendiente</span>
        </div>
    );
};

export default RequestItem;
