"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users.service";
import { User } from "../types/user";
import { useAuth } from "@/features/auth/hooks/useAuth";
import UsersCard from "./UsersCard";

const UsersContainer = () => {
    const scrollbarStyles = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

    const { user: currentUser } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })

    const rawUsers = data?.data ?? [];

    const users = [...rawUsers].sort((a, b) => {
            if (String(a.id) === String(currentUser?.id)) return -1;
            if (String(b.id) === String(currentUser?.id)) return 1;
            return 0;
        });

    if (isLoading) return <UsersContainerSkeleton/>;

    return (
        <section className="flex-1 min-h-0 min-w-0 flex">
            <div className={`min-h-0 flex-1 overflow-y-auto ${scrollbarStyles}`}>
                <div className="flex flex-col gap-4">
                    {
                        users.map((user : User) => {
                            const isMe = String(user.id) === String(currentUser?.id);

                            return (
                                <div key={user.id} className="flex items-center gap-4">
                                    <UsersCard user={user} isMe={isMe}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default UsersContainer;

export const UsersContainerSkeleton = () => {
    return (
        <div className="h-full w-full bg-neutral-200 flex flex-col flex-1 min-h-0 min-w-0 rounded-lg shadow-sm"/>
    )
}