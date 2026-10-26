import CompanyForm from "@/features/settings/CompanyForm";

const Page = () => {
    return (
        <section className="w-full flex flex-col p-8 gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">Ajustes de tu empresa</h1>
                <p className="text-neutral-600 text-sm">
                    Actualiza los datos de tu empresa que aparecerán en tus comprobantes y documentos.
                </p>
            </div>

            <CompanyForm />
        </section>
    );
};

export default Page;