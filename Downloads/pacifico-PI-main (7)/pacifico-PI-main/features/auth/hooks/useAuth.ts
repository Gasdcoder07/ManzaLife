import { getUserSession, loginUser } from "@/features/auth/services/auth.service";
import { UserProfile } from "@/features/auth/types/authInterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data : user, isLoading : loading } = useQuery({
        queryKey : ["authUser"],
        queryFn : getUserSession,
        staleTime : 1000 * 60 * 60,
        retry : false
    });

    const loginMutation = useMutation({
        mutationFn : loginUser,
        onSuccess : (data) => {
            const { session, usuario } = data;

            localStorage.setItem("token", session.access_token);
            localStorage.setItem("userId", String(usuario.id));

            if (session.refresh_token) {
                localStorage.setItem("refreshToken", session.refresh_token);
            }

            document.cookie = `token=${session.access_token}; path=/; max-age=3600; secure; samesite=strict`;
            document.cookie = `user_role=${usuario.rol_id}; path=/; max-age=3600; secure; samesite=strict`;

            queryClient.setQueryData<UserProfile>(["authUser"], usuario);
            router.push("/sell");
        },
        onError : (error) => {
            console.log(`Error al iniciar sesión: `, error);
        }
    });

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");

        document.cookie = `token=; path=/; max-age=0; secure; samesite=strict`;
        document.cookie = `user_role=; path=/; max-age=0; secure; samesite=strict`;

        queryClient.removeQueries({ queryKey : ["authUser"] });

        router.replace("/login");
    };

    return {
        user,
        loading,
        login : loginMutation.mutateAsync,
        isLoggingIn : loginMutation.isPending,
        logout,
    };
}