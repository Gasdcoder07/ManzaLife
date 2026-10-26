"use client";

import { toastContainerStyle, toastOptionsConfig } from "@/shared/config/toast.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers ({ children } : { children : React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions : {
            queries : {
                refetchOnWindowFocus : false
            }
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            
            <Toaster
                position="top-right"
                containerStyle={toastContainerStyle}
                toastOptions={toastOptionsConfig}
            />
        </QueryClientProvider>
    )
}