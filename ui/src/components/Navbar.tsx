import {
    Container,
    type ContainerProps,
    HStack,
    IconButton,
} from "@chakra-ui/react";
import {LuAlignRight} from "react-icons/lu";

import {Logo} from "@/assets/logo";
import {
    DrawerBackdrop,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {Sidebar, SidebarLinkType} from "@/components/Sidebar";

interface NavbarProps {
    props: ContainerProps;
    links: SidebarLinkType[];
}

export const Navbar = ({props, links = []}: NavbarProps) => {
    return (
        <Container
            py="2.5"
            background="bg.panel"
            borderBottomWidth="1px"
            {...props}
        >
            <HStack justify="space-between">
                <Logo/>
                <DrawerRoot placement="start">
                    <DrawerTrigger asChild>
                        <IconButton
                            variant="ghost"
                            colorPalette="gray"
                        >
                            <LuAlignRight/>
                        </IconButton>
                    </DrawerTrigger>
                    <DrawerBackdrop/>
                    <DrawerContent>
                        <DrawerCloseTrigger colorPalette="gray"/>
                        <Sidebar props={{}} links={links}/>
                    </DrawerContent>
                </DrawerRoot>
            </HStack>
        </Container>
    );
};
