import { FaEye, FaEyeSlash } from "react-icons/fa";

const StepTwo = ({ formData, handleChange, type, handleType }) => {
  return (
    <div className="flex flex-col gap-2 min-h-36">
        <input
            className="w-full px-3 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            type="text"/>

        <input
            className="w-full pl-3 pr-10 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            type={type}
            />

        <div className="relative">
            <input
                className="w-full pl-3 pr-10 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light focus:border-white transition-all duration-200 ease-in-out"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                type={type}
            />
            <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 -translate-x-7 text-white/30 hover:text-white cursor-pointer"
            >
                {
                    type === "password" ? (
                        
                        <FaEyeSlash onClick={handleType}/>
                    ) : (
                        <FaEye onClick={handleType}/>
                    )
                }
            </button>
        </div>
    </div>
  );
};

export default StepTwo;
