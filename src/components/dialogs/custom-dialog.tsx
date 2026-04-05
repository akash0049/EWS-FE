import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    width?: string;
    height?: string;
    title: string;
    description: string;
    content: React.ReactNode;
}

const CustomDialog = ({ open, onClose, maxWidth = 'sm', height = '90vh', width = '100vw', title, description, content }: CustomDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return;
                onClose();
            }}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                    height: {height},
                    width: {width},
                    borderRadius: 3,
                    overflow: "visible",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    pb: 1,
                    px: 3
                }}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        {description}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        mt: 0,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ m: 1}}>
                {content}
            </DialogContent>
        </Dialog>
    );
}

export default CustomDialog;