const PostFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center py-12 gap-8">

        <div className="max-w-2xl w-full flex flex-col gap-12">
            <div className="bg-white/10 rounded-xl mx-auto w-2/3 h-12"/>

            <div className="flex justify-end">
                <div className="bg-white/10 rounded-xl w-1/3 h-10"/>
            </div>
        </div>

        <div className="max-w-2xl w-full space-y-6">
            <div className="rounded-xl bg-white/10 w-full h-12"/>
            <div className="rounded-xl bg-white/10 w-full h-72"/>
        </div>
    </div>
  );
};

export default PostFormSkeleton;
