import { Box, alpha, useTheme, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

export interface CustomSearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    width?: string | number | Record<string, string | number>;
}

const CustomSearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    width = 240,
}: CustomSearchInputProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                width: width,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                    transition: "all 0.2s",
                    border: "1px solid transparent",
                    "&:focus-within": {
                        bgcolor: "background.paper",
                        borderColor: "primary.main",
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                    },
                }}
            >
                <Search sx={{ fontSize: 18, color: "text.secondary" }} />
                <InputBase
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{
                        flex: 1,
                        fontSize: "0.8rem",
                    }}
                />
            </Box>
        </Box>
    );
};

export default CustomSearchInput;
