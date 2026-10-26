import { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "@/features/auth/components/RegisterForm";
export const metadata : Metadata = {
    title : "Pacífico - Autenticación",
    description : "Registrate y crea una cuenta"
}

const page = () => {
    return (
        <div className="w-full h-full flex">
            <div className="relative hidden md:flex w-1/2 overflow-hidden rounded-xl">
                <Image
                    src="/auth_image.webp"
                    alt="Auth Image"
                    fill
                    className="object-cover"
                    priority
                    quality={75}/>

                <div className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-12 text-right text-white p-2 flex flex-col gap-2">
                    <h3 className="text-3xl leading-relaxed font-semibold">Todo tu negocio, bajo control.</h3>

                    <p className="max-w-2xl leading-relaxed font-light">Gestiona tus sucursales, ventas e inventario de forma simple y eficiente.</p>
                </div>
            </div>

            <div className="relative w-full md:w-1/2 p-4 md:pl-8">
                <div className="max-w-md mx-auto h-full flex flex-col justify-center gap-6">
                    <Image
                        quality={80}
                        priority
                        width={1000}
                        height={1000}
                        src="/pacifico-logo.svg"
                        alt="Logo de Pacífico"
                        className="flex sm:hidden h-16 w-auto self-start object-contain -translate-x-1.5"/>

                    <Image
                        quality={80}
                        priority
                        width={1000}
                        height={1000}
                        src="/pacifico-logo-horizontal.svg"
                        alt="Logo de Pacífico"
                        className="hidden sm:flex h-16 w-auto self-start object-contain -translate-x-1.5"/>

                    <div className="text-left flex flex-col gap-2 w-full">
                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide">Crea tu cuenta</h3>

                        <p className="text-sm text-neutral-600 leading-relaxed">Completa tus datos para comenzar a gestionar tu negocio.</p>
                    </div>

                    <RegisterForm/>
                </div>
            </div>
        </div>
    );
};

export default page;