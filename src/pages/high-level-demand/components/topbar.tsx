import React from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    IconButton,
    Button,
    Divider,
    Paper
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

// Define your props here if you make the component dynamic later
interface HighLevelDemandTopbarProps {
    // e.g., onAddObject?: () => void;
}

const HighLevelDemandTopbar: React.FC<HighLevelDemandTopbarProps> = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
                bgcolor: '#f5f7f8',
                color: '#0f172a',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    px: 3,
                    py: 2,
                    gap: 2
                }}
            >
                {/* Unified Control Row */}
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5,
                        bgcolor: '#ffffff',
                        p: 1,
                        borderRadius: 2,
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                >
                    {/* Left Side Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>

                        {/* Project Select */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
                            <Typography
                                sx={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: '#94a3b8',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Xopsoup
                            </Typography>
                            <Select
                                defaultValue="Select Project"
                                size="small"
                                sx={{
                                    width: '100%',
                                    bgcolor: '#f8fafc',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' },
                                    '.MuiSelect-select': { py: 0.75, pl: 1, pr: 4, fontSize: '0.875rem' }
                                }}
                            >
                                <MenuItem value="Select Project">Select Project</MenuItem>
                                <MenuItem value="Project Alpha">Project Alpha</MenuItem>
                                <MenuItem value="Beta System">Beta System</MenuItem>
                            </Select>
                        </Box>

                        {/* Object Name Select */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '200px' }}>
                            <Typography
                                sx={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: '#94a3b8',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Object Name
                            </Typography>
                            <Select
                                defaultValue="All Objects"
                                size="small"
                                sx={{
                                    width: '100%',
                                    bgcolor: '#f8fafc',
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' },
                                    '.MuiSelect-select': { py: 0.75, pl: 1, pr: 4, fontSize: '0.875rem' }
                                }}
                            >
                                <MenuItem value="All Objects">All Objects</MenuItem>
                                <MenuItem value="Hardware Cluster">Hardware Cluster</MenuItem>
                                <MenuItem value="Virtual Node">Virtual Node</MenuItem>
                            </Select>
                        </Box>

                        {/* Vertical Divider */}
                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5, borderColor: '#e2e8f0' }} />

                        {/* Action Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton
                                title="Filter Settings"
                                sx={{
                                    p: 0.75,
                                    color: '#64748b',
                                    borderRadius: 1,
                                    '&:hover': { color: '#007bff', bgcolor: '#f1f5f9' }
                                }}
                            >
                                <TuneIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                title="Export Data"
                                sx={{
                                    p: 0.75,
                                    color: '#64748b',
                                    borderRadius: 1,
                                    '&:hover': { color: '#007bff', bgcolor: '#f1f5f9' }
                                }}
                            >
                                <DownloadIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Right Side Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {/* Add Object Button */}
                        <Button
                            startIcon={<AddIcon fontSize="small" />}
                            disableElevation
                            sx={{
                                px: 1.5,
                                py: 0.75,
                                bgcolor: '#f1f5f9',
                                color: '#334155',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderRadius: 1,
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            Add Object
                        </Button>

                        {/* Vertical Divider */}
                        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 0.5, borderColor: '#e2e8f0' }} />

                        {/* View Toggle */}
                        <Box sx={{ display: 'flex', bgcolor: '#f1f5f9', p: '2px', borderRadius: 1 }}>
                            <IconButton
                                sx={{
                                    p: '4px',
                                    bgcolor: '#ffffff',
                                    color: '#007bff',
                                    borderRadius: 1,
                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                    '&:hover': { bgcolor: '#ffffff' }
                                }}
                            >
                                <TableRowsIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    p: '4px',
                                    color: '#64748b',
                                    borderRadius: 1
                                }}
                            >
                                <GridViewIcon fontSize="small" />
                            </IconButton>
                        </Box>

                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default HighLevelDemandTopbar;