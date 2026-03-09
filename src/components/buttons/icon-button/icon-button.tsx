import {
    Tooltip,
    IconButton,
} from "@mui/material";

interface CustomIconButtonProps {
    title: string;
    icon: React.ReactElement,
    onClick: () => void
}

const CustomIconButton = ({ title, icon, onClick }: CustomIconButtonProps) => {
    return (
        <Tooltip title={title}>
            <IconButton
                color="primary"
                onClick={onClick}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default CustomIconButton