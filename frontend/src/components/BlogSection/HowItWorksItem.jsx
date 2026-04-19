const HowItWorksItem = ({Icon, IconStyle, Title, Description}) => {
  return (
    <div className="w-full flex justify-center items-start gap-4">
        <div className="bg-neutral-100 dark:bg-neutral-800 py-2 px-3 rounded-xl flex justify-center items-center shadow-xl">
            <Icon className={IconStyle}/>
        </div>
        <div className="flex flex-col gap-2">
            <h5 className="text-lg tracking-wide">{Title}</h5>
            <p className="text-neutral-800 dark:text-neutral-400 text-sm">{Description}</p>
        </div>
    </div>
  );
};

export default HowItWorksItem;
