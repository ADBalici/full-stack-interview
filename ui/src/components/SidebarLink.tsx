import {Link} from "react-router-dom"; // Import React Router's Link

import {Button, type ButtonProps} from "@/components/ui/button";

interface Props extends ButtonProps {
    to: string;
}

export const SidebarLink = (props: Props) => {
    const {children, to, ...buttonProps} = props;
    return (
        <Button
            variant="ghost"
            width="full"
            justifyContent="start"
            gap="3"
            color="fg.muted"
            _hover={{
                bg: "colorPalette.subtle",
                color: "colorPalette.fg",
            }}
            _currentPage={{
                color: "colorPalette.fg",
            }}
            asChild
            {...buttonProps}
        >
            <Link to={to}>{children}</Link>
        </Button>
    );
};
