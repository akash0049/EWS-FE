import { Tooltip, IconButton } from "@mui/material";

interface CustomIconButtonProps {
    title: string;
    size: "small" | "medium" | "large";
    color?: string,
    bgcolor?: string,
    icon: React.ReactElement,
    onClick: () => void
}

const CustomIconButton = ({ title, size='small', icon, onClick, color = "primary.main", bgcolor = "" }: CustomIconButtonProps) => {
    return (
        <Tooltip title={title}>
            <IconButton
                size={size}
                onClick={onClick}
                sx={{
                    ml: 0.5,
                    color: color,
                    borderRadius: 1,
                    transition: "all 0.15s",
                    "&:hover": {
                        bgcolor: bgcolor
                    },
                }}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default CustomIconButton