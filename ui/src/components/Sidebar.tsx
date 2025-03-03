import type {ReactElement} from "react";

import {Box, Stack, type StackProps, StackSeparator} from "@chakra-ui/react";
import {LuCircleHelp, LuSettings} from "react-icons/lu";

import {SidebarLink} from "./SidebarLink";
import {SidebarSearchField} from "./SidebarSearchField";
import {Logo} from "@/assets/logo";

export type SidebarLinkType = {
    to: string;
    label: string;
    icon?: ReactElement;
    children?: SidebarLinkType[];
    notificationsCount?: number | null;
};

interface SidebarProps {
    props: StackProps;
    links: SidebarLinkType[];
}

export const Sidebar = ({props, links = []}: SidebarProps) => {
    return (
        <Stack
            flex="1"
            p={{base: "4", md: "6"}}
            bg="bg.panel"
            borderRightWidth="1px"
            justifyContent="space-between"
            maxW="xs"
            {...props}
        >
            <Stack gap="6">
                <Logo style={{alignSelf: "start"}}/>
                <SidebarSearchField/>
                <Stack gap="1">
                    {links.map((link) => (
                        <SidebarLink key={link.to} to={link.to}>
                            {link.icon && link.icon} {link.label}
                        </SidebarLink>
                    ))}
                </Stack>
            </Stack>
            <Stack gap="4" separator={<StackSeparator/>}>
                <Box/>
                <Stack gap="1">
                    <SidebarLink to="/help-center">
                        <LuCircleHelp/> Help Center
                    </SidebarLink>
                    <SidebarLink to="/settings">
                        <LuSettings/> Settings
                    </SidebarLink>
                </Stack>
            </Stack>
        </Stack>
    );
};
