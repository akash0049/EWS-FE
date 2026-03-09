import type { Components, Theme } from "@mui/material/styles";

export const MuiButton: Components<Theme>["MuiButton"] = {
    styleOverrides: {
        root: {
            height: 35,
            textTransform: "none",
            borderRadius: '8px',
            '&:hover': {
                backgroundColor: 'primary.dark',
            }
        }
    },
};