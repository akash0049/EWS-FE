import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button
} from "@mui/material";
import { Close } from "@mui/icons-material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";

/* ── Dialog Props ── */
interface AddObjectDialogProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

const AddObjectDialog = ({ open, onClose }: AddObjectDialogProps) => {
    const [xops, setXops] = useState("");
    const [objectName, setObjectName] = useState("");

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    height: "54vh",
                    borderRadius: 3,
                    overflow: "visible",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                },
            }}
        >
            {/* ── Dialog Header ── */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    pb: 1,
                    pt: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Add Object in Demand
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => onClose(false)}
                    size="small"
                    sx={{
                        mt: 0,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent sx={{ mx: 2, mt: 1 }}>
                <Box
                    sx={{
                        py: 2,
                        px: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <CustomSelectInput
                        label="XOps"
                        placeholder="Select a xops"
                        required
                        options={[]}
                        value={xops}
                        onChange={(value) => setXops(value != null ? String(value) : "")}
                    />
                    <CustomSelectInput
                        label="Object Name"
                        placeholder="Select a object name"
                        required
                        options={[]}
                        value={objectName}
                        onChange={(value) => setObjectName(value != null ? String(value) : "")}
                    />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Button
                            variant="outlined"
                            onClick={() => { }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => { }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddObjectDialog;