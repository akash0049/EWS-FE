import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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

const XOPS_List = [
    { value: "Commercial", label: "Commercial" },
    { value: "Consumer", label: "Consumer" },
    { value: "Customer Development", label: "Customer Development" },
    { value: "Customer Operations", label: "Customer Operations" },
    { value: "People", label: "People" },
    { value: "Supply Chat & R&D", label: "Supply Chat & R&D" },
    { value: "Unknown", label: "Unknown" },
];

const OBJECT_LIST = [
    { value: "Account[SOB52770]Carelines Consumer", label: "Account[SOB52770]Carelines Consumer" },
    { value: "ActivityRequest[SOB50369]", label: "ActivityRequest[SOB50369]" },
    { value: "Aggregateddata[TOB58568]", label: "Aggregateddata[TOB58568]" },
];

const AddObjectDialog = ({ open, onClose }: AddObjectDialogProps) => {
    const [xops, setXops] = useState("");
    const [objectName, setObjectName] = useState("");

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return; // prevent close on outside click
                onClose(false);
            }}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    height: "50vh",
                    borderRadius: 3,
                    p: 2,
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
                    px: 0,
                    py: 0.5,
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
            <DialogContent>
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
                        options={XOPS_List}
                        value={xops}
                        onChange={(value) => setXops(value != null ? String(value) : "")}
                    />
                    <CustomSelectInput
                        label="Object Name"
                        placeholder="Select a object name"
                        required
                        options={OBJECT_LIST}
                        value={objectName}
                        onChange={(value) => setObjectName(value != null ? String(value) : "")}
                    />

                    {/* <Box sx={{
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
                    </Box> */}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 0, my: 0, mx: 4 }}>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => onClose(false)}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddObjectDialog;