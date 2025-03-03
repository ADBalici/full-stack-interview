import {LuFileSearch} from "react-icons/lu";
import {
    Route,
    Routes,
    BrowserRouter,
    Outlet,
} from "react-router-dom";

import type {SidebarLinkType} from "@/components/Sidebar";
import {SidebarLayout} from "@/layouts/SidebarLayout";
import {Files} from "@/pages/Files";

const SIDEBAR_LINKS: SidebarLinkType[] = [
    {
        to: "/",
        label: "Files",
        icon: <LuFileSearch/>,
    },
];

export function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <SidebarLayout links={SIDEBAR_LINKS}>
                            <Outlet/>
                        </SidebarLayout>
                    }
                >
                    <Route path="/" element={<Files/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
