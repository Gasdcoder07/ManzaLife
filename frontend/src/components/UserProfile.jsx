import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const UserProfile = ({ UserAvatar, Username }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const dropdownRef = useRef(null);
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setAvatarDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

  return (
    <div
        ref={dropdownRef}
        className="relative"
        onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}>
            <div className="relative">
                <img
                    src={UserAvatar}
                    alt={Username}
                    className="size-10 object-cover rounded-full cursor-pointer"/>

                <div className="absolute bottom-0 translate-x-1/2 size-2 rounded-full bg-green-600"/>
            </div>

            {
                avatarDropdownOpen && (
                    <div className="absolute rounded-xl bg-zinc-800 border-neutral-800 shadow-lg top-full right-0 mt-2 w-48 max-h-52 z-20 overflow-y-auto custom-scrollbar">
                        <div className="w-full h-full px-6 py-3">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center px-2 py-1">
                                    <FaUser className="text-lg"/>
                                    <span>Perfil</span>
                                </div>

                                <hr className="text-neutral-600"/>

                                <button
                                    onClick={(handleLogout)}
                                    className="cursor-pointer rounded-lg flex gap-2 justify-center items-center px-2 py-1 hover:bg-zinc-700">
                                    <IoLogOut className="text-lg"/>
                                    <span>Cerrar sesión</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
    </div>
  );
};

export default UserProfile;
