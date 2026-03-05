import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            dark: "#001F82",
            main: '#0033CC',
            light: "#4D79FF"
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: "'Unilever Desire', sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 400 },
        subtitle2: { fontWeight: 400 },
        body1: { fontWeight: 400 },
        body2: { fontWeight: 400 },
        button: { fontWeight: 600 },
    },
});

export default theme;

