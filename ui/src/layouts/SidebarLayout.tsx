import type {ReactNode} from "react";

import {Box, Flex} from "@chakra-ui/react";

import {Navbar} from "@/components/Navbar";
import type {SidebarLinkType} from "@/components/Sidebar";
import {Sidebar} from "@/components/Sidebar";

interface SidebarLayoutProps {
    children: ReactNode;
    links: SidebarLinkType[];
}

export const SidebarLayout = ({children, links = []}: SidebarLayoutProps) => {
    return (
        <>
            <Flex
                height="100vh"
                flex="1"
                direction={{base: "column", md: "row"}} // Responsive direction
            >
                <Navbar props={{hideFrom: "md"}} links={links}/>
                <Sidebar props={{hideBelow: "md"}} links={links}/>
                <Box
                    flex="1" // Take remaining space
                    overflowY="auto" // Make content scrollable
                    height="100vh" // Full viewport height for scrollable content
                >
                    {children}
                </Box>
            </Flex>
        </>
    );
};
