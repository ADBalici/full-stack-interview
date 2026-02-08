import React from "react";

import {ChakraProvider, createSystem, defaultConfig} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import {PageRouter} from "@/pages/PageRouter";

const REACT_QUERY_STALE_TIME = Infinity;

const system = createSystem(defaultConfig, {
    globalCss: {
        body: {
            colorPalette: "cyan",
        },
    },
    theme: {
        tokens: {
            fonts: {
                body: {value: "var(--font-inter)"},
            },
        },
        semanticTokens: {
            radii: {
                l1: {value: "none"},
                l2: {value: "none"},
                l3: {value: "none"},
            },
        },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: REACT_QUERY_STALE_TIME,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            <QueryClientProvider client={queryClient}>
                <PageRouter/>
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
);
