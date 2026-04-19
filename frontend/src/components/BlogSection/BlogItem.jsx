const BlogItem = ({Icon, color, text}) => {
  return (
      <div className="flex items-center gap-4 text-lg">
          <div className="bg-neutral-100 dark:bg-neutral-800 py-2 px-3 rounded-xl flex justify-center items-center shadow-xl">
              <Icon className={color} />
          </div>
          <p className="tracking-wide">{text}</p>
      </div>
  );
};

export default BlogItem;