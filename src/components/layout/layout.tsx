import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Sidebar from './sidebar/sidebar';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden',
                    backgroundColor: '#f5f7f8',
                }}
            >
                <Toolbar variant="dense" sx={{ minHeight: 44, flexShrink: 0 }} />
                <Box sx={{ flex: 1, overflow: 'hidden', px: 2, py: 2, display: 'flex', flexDirection: 'column' }}>
                    {children || <Outlet />}
                </Box>
            </Box>
        </Box>
    );
};

export default AppLayout;