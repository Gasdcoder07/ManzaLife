const PostFormError = () => {
  return (
    <div className="py-4 flex flex-col justify-center items-center gap-8 h-full">
        <p className="text-neutral-300 text-center">No puedes editar una publicación que no es tuya.</p>
    </div>
  );
};

export default PostFormError;
