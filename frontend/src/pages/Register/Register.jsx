import { useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navbar } from "../../components/index";
import SideImage from "../../../imgs/LoginResources/Login_hadas.jpeg";
import axios from "axios"

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const handleType = () => {
        setType(prev => prev === "password" ? "text" : "password");
    };

    const handleRegister = async () => {
        if (password != confirmPassword) {
            alert("Las contraseñas no coinciden :v")
            return 
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/register/",
                {
                    username: username,
                    email: email,
                    password: password,
                    password_confirm: confirmPassword,
                    first_name: firstName,
                    last_name: lastName
                }
            )

            console.log(response.data)
            alert("Usuario creado correctamente")

        } catch (err) {
            console.error(err)
            alert("Error al crear usuario")
        }
    }

    return (
        <div className="relative h-screen flex justify-center items-center bg-linear-to-br from-zinc-950 via-zinc-900 to-orange-950 overflow-hidden px-6 py-4 md:px-20 lg:px-32">
            <Navbar />

            <div className="size-52 bg-orange-500/30 absolute top-4 left-8 rounded-full blur-3xl animate-pulse duration-700" />
            <div className="size-52 bg-amber-400/25 absolute bottom-4 left-8 rounded-full blur-3xl animate-pulse duration-700 delay-500" />
            <div className="size-52 bg-rose-500/20 absolute top-4 right-8 rounded-full blur-3xl animate-pulse duration-700 delay-300" />
            <div className="size-52 bg-orange-700/25 absolute bottom-4 right-8 rounded-full blur-3xl animate-pulse duration-700 delay-200" />

            <div className="max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden min-h-1/2">

                <div className="relative w-full md:w-1/2">
                    <img
                        className="h-full w-full object-cover"
                        src={SideImage}
                        alt="Side Image"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                </div>

                <div className="w-full md:w-1/2 bg-linear-to-br from-yellow-500 via-amber-600 to-orange-700 flex justify-center">
                    <form className="text-white px-4 md:px-8 lg:px-12 py-6 flex flex-col gap-8 items-center justify-center">

                        <h3 className="text-3xl text-center font-bold tracking-wide">
                            Crear cuenta
                        </h3>

                        <div className="flex flex-col gap-4 w-full">

                            <input
                                className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white"
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <input
                                className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white"
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="relative">
                                <input
                                    className="pl-3 pr-10 py-1.5 border border-white outline-none rounded-lg placeholder-white w-full"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {/* {type === "password" ? (
                                    <FaEye
                                        onClick={handleType}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={handleType}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                )} */}
                            </div>

                            <div className="relative">
                                <input
                                    className="pl-3 pr-10 py-1.5 border border-white outline-none rounded-lg placeholder-white w-full"
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                {/* {typeConfirm === "password" ? (
                                    <FaEye
                                        onClick={handleTypeConfirm}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={handleTypeConfirm}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                )} */}
                            </div>

                            <button
                                type="button"
                                className="rounded-lg mt-6 bg-zinc-950 hover:text-orange-600 hover:-translate-y-1 duration-200 ease-in-out transition-all px-6 py-2 tracking-wide cursor-pointer"
                                onClick={handleRegister}
                            >
                                Crear cuenta
                            </button>

                            <p className="text-sm text-center tracking-wide">
                                ¿Ya tienes cuenta?{" "}
                                <Link
                                    to={"/login"}
                                    className="hover:text-zinc-950 hover:underline transition-colors duration-200"
                                >
                                    Inicia sesión
                                </Link>
                            </p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
