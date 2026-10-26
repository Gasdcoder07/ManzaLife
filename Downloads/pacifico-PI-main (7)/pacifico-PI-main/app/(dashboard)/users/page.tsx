import CreateUserButton from "@/features/users/components/CreateUserButton";
import UsersContainer from "@/features/users/components/UsersContainer";

const page = () => {
    return (
        <section className="flex flex-col h-full min-h-0 overflow-hidden px-10 py-8 gap-8">
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">Gestión de usuarios</h3>
                <p className="text-neutral-500 text-sm">Las personas que mantienen tu sucursal.</p>
            </div>

            <div className="flex flex-col gap-4 min-h-0 min-w-0 flex-1">
                <CreateUserButton />

                <UsersContainer/>
            </div>
        </section>
    );
};

export default page;
