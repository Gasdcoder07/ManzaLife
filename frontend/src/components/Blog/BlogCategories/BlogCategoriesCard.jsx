const BlogCategoriesCard = ({ nombre, imagen }) => {
  return (
    <div className="bg-zinc-50 dark:bg-[#0d0d0f] group w-full h-40 flex border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out shadow-xl">
      
        <div className="w-1/2 h-full overflow-hidden">
            <img
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imagen}
            alt={nombre} 
            />
        </div>

        <div className="w-1/2 px-8 py-4 flex items-center">
            <p className="font-medium tracking-widest group-hover:text-orange-600 transition-all duration-200 ease-in-out">
            {nombre}
            </p>
        </div>

    </div>
  );
};

export default BlogCategoriesCard;