const CategoriesCard = ({ CategorieImage, CategorieIcon, CategorieTitle }) => {
    return (
        <div className="rounded-xl overflow-hidden max-w-xs w-full bg-linear-to-b from-orange-500 via-orange-600 to-orange-700 transition-all ease-in-out duration-200 hover:-translate-y-1 cursor-pointer shadow-md shadow-zinc-950/60">
            <div className="h-48">
                <img
                    src={CategorieImage}
                    alt="Imagen"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col px-4 py-3 gap-2">
                <div className="flex items-center gap-2 font-bold">
                    <CategorieIcon className="text-lg"/>
                    <h3 className="text-xl tracking-wide">
                        {CategorieTitle}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default CategoriesCard;
