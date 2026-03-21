const StepOne = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-2 min-h-36">
        <div className="flex gap-2">
            <input
                className="w-1/2 px-3 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
                name="first_name"
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
                type="text"/>
            <input
                className="w-1/2 px-3 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
                name="last_name"
                placeholder="Apellidos"
                value={formData.last_name}
                onChange={handleChange}
                type="text"/>
        </div>
        <input
            className="w-full px-3 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            type="text"/>
    </div>
  );
};

export default StepOne;
