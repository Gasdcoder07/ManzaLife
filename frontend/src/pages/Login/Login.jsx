import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navbar } from "../../components/index"
import SideImage from "../../../imgs/LoginResources/Login_hadas.jpeg"

export default function Login() {

    const [type, setType] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleType = () => {
        setType(prev => prev === "password" ? "text" : "password");
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const data = await res.json()
            console.log("STATUS: ", data.status)
            console.log("RESPONSE: ", data)

            if (!res.ok)
                throw new Error(JSON.stringify(data))

            localStorage.setItem("access_token", data.access)
            localStorage.setItem("refresh_token", data.refresh)

            navigate("/")

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative h-screen flex justify-center items-center bg-linear-to-br from-zinc-950 via-zinc-900 to-orange-950 overflow-hidden px-6 py-4 md:px-20 lg:px-32">
            <Navbar />

            <div className="size-52 bg-orange-500/30 absolute top-4 left-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-150" />

            <div className="size-52 bg-amber-400/25 absolute bottom-4 left-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-500" />

            <div className="size-52 bg-rose-500/20 absolute top-4 right-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-300" />

            <div className="size-52 bg-orange-700/25 absolute bottom-4 right-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-200" />

            <div className="max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden min-h-1/2">
                <div className="relative w-full md:w-1/2">
                    <img
                        className="h-full w-full object-cover"
                        src={SideImage}
                        alt="Side Image"
                    />

                    <div className="absolute inset-0 bg-black/45" />
                </div>
                <div className="w-full md:w-1/2 bg-linear-to-br from-yellow-500 via-amber-600 to-orange-700">
                    <form 
                        onSubmit={handleSubmit}
                        className="text-white px-4 md:px-8 lg:px-12 py-6 flex flex-col gap-8 items-center">
                        <h3 className="text-3xl text-center font-bold tracking-wide">
                            Bienvenido de nuevo
                        </h3>

                        <div className="flex flex-col gap-4 text-white">
                            <input
                                className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white"
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <div className="relative">
                                <input
                                    className="pl-3 pr-10 py-1.5 border border-white outline-none rounded-lg placeholder-white w-full"
                                    type={type}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                {type === "password" ? (
                                    <FaEye
                                        onClick={() => handleType()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => handleType()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white ease-in-out transition-colors duration-200"
                                    />
                                )}
                            </div>

                            {error && (
                                <p className="text-red-600 text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg mt-6 bg-zinc-950 hover:text-orange-600 hover:-translate-y-1 duration-200 ease-in-out transition-all px-6 py-2 tracking-wide cursor-pointer"
                            >
                                {loading ? "Cargando..." : "Iniciar sesión"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
