const SectionTitle = ({Title}) => {
  return (
      <div className="flex justify-center">
          <div className="bg-neutral-900 flex justify-center items-center py-2 px-3 rounded-full">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800 text-sm">
                  {Title}
              </span>
          </div>
      </div>
  );
};

export default SectionTitle;
