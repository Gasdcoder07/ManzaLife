const ModalLayout = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-20 flex justify-center items-center p-4">
        {children}
    </div>
  );
};

export default ModalLayout;
