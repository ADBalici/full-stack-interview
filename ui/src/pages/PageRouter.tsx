import {LuScale} from "react-icons/lu";
import {
    Route,
    Routes,
    BrowserRouter,
    Outlet,
} from "react-router-dom";

import type {SidebarLinkType} from "@/components/Sidebar";
import {SidebarLayout} from "@/layouts/SidebarLayout";
import {Lawsuits} from "@/pages/Lawsuits";

const SIDEBAR_LINKS: SidebarLinkType[] = [
    {
        to: "/",
        label: "Lawsuits",
        icon: <LuScale/>,
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
                    <Route path="/" element={<Lawsuits/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
