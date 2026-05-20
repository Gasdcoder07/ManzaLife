const PostFormError = ({ isEnglish }) => {
  return (
    <div className="py-4 flex flex-col justify-center items-center gap-8 h-full">
        <p className="text-neutral-400 dark:text-neutral-300 text-center">
            {isEnglish ? "You cannot edit a post that is not yours." : "No puedes editar una publicación que no es tuya."}
        </p>
    </div>
  );
};

export default PostFormError;
