import { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/features/auth/components/LoginForm";
import { getTranslations } from "next-intl/server";

// Para traducir el título de la pestaña según el idioma actual
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Login");
  return {
    title: `Pacífico - ${t("title")}`,
    description: t("subtitle"),
  };
}

const page = async () => {
  // Cargamos las traducciones del namespace "Login"
  const t = await getTranslations("Login");

  return (
    <div className="w-full h-full flex">
      <div className="relative w-full md:w-1/2 p-4 md:pr-8">
        <div className="max-w-md mx-auto h-full flex flex-col justify-center gap-6">
          <Image
            quality={80}
            priority
            width={1000}
            height={1000}
            src="/pacifico-logo.svg"
            alt="Logo de Pacífico"
            className="flex sm:hidden h-16 w-auto self-start object-contain -translate-x-1.5"
          />

          <Image
            quality={80}
            priority
            width={1000}
            height={1000}
            src="/pacifico-logo-horizontal.svg"
            alt="Logo de Pacífico"
            className="hidden sm:flex h-16 w-auto self-start object-contain -translate-x-1.5"
          />

          <div className="text-left flex flex-col gap-2 w-full">
            {/* Texto traducido */}
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-wide">
              {t("title")}
            </h3>

            {/* Texto traducido */}
            <p className="text-sm text-neutral-600 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <LoginForm />
        </div>
      </div>

      <div className="relative hidden md:flex w-1/2 overflow-hidden rounded-xl">
        <Image
          src="/auth_image.webp"
          alt="Auth Image"
          fill
          className="object-cover"
          priority
          sizes="1080px"
          quality={75}
        />

        <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-12 text-white p-2 flex flex-col gap-2">
          {/* Texto traducido */}
          <h3 className="text-3xl leading-relaxed font-semibold">
            {t("heroTitle")}
          </h3>

          {/* Texto traducido */}
          <p className="max-w-2xl leading-relaxed font-light">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;