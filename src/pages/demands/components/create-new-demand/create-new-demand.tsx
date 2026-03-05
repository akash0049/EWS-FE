import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Link,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import {
    CirclePlus,
    UserCog,
    Send,
    PowerOff,
    RefreshCw,
    X,
} from "lucide-react";
import CustomTextInput from "../../../../components/inputs/text-input/text-input";
import CustomSelectInput from "../../../../components/inputs/select-input/select-input";

const PRIMARY = "#0d7ff2";

/* ── User group options ── */
const USER_GROUP_OPTIONS = [
    { value: "admin", label: "Administrators" },
    { value: "dev", label: "Developers" },
    { value: "qa", label: "QA Team" },
    { value: "analyst", label: "Data Analysts" },
];

/* ── Available Users to Add ── */
const USERS_LIST = [
    { value: "u1", label: "Akash Mahajan" },
    { value: "u2", label: "John Doe" },
    { value: "u3", label: "Jane Smith" },
    { value: "u4", label: "Alice Johnson" },
    { value: "u5", label: "Bob Brown" },
];

/* ── Dialog Props ── */
interface CreateNewDemandDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateNewDemand = ({ open, onClose }: CreateNewDemandDialogProps) => {
    const [demandName, setDemandName] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [groupEmail, setGroupEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [usersInGroup, setUsersInGroup] = useState<typeof USERS_LIST>([]);

    const handleClose = () => {
        setDemandName("");
        setUserGroup("");
        setGroupEmail("");
        setSelectedGroup("");
        setUsersInGroup([]);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    height: "95vh",
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
                    <Typography variant="h6" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Create New Demand
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        New Demand to be created by DQ Engagement Team
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{
                        mt: 0.5,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <X size={18} />
                </IconButton>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent sx={{ p: 3, overflow: "visible" }}>
                {/* ── Two-Column Grid ── */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                        gap: 3,
                        mt: 2,
                    }}
                >
                    {/* ── Left: Create New Demand ── */}
                    <Paper
                        variant="outlined"
                        sx={{
                            height: "74vh",
                            px: 4,
                            py: 2,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        {/* Section Header */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box
                                sx={{
                                    p: 1,
                                    bgcolor: `${PRIMARY}1A`,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CirclePlus size={22} color={PRIMARY} />
                            </Box>
                            <Typography variant="h6" fontWeight={700} color="text.primary">
                                Create New Demand
                            </Typography>
                        </Box>

                        {/* Form Fields */}
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <CustomTextInput
                                label="Project Demand Name"
                                placeholder="Enter demand name"
                                required

                                value={demandName}
                                onChange={(e) => setDemandName(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                    },
                                }}
                            />
                            <CustomTextInput
                                label="User Group"
                                placeholder="Enter user group"
                                required

                                value={userGroup}
                                onChange={(e) => setUserGroup(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                    },
                                }}
                            />
                            <CustomTextInput
                                label="Group Email"
                                placeholder="example@company.com"
                                description="By providing this email, you will receive notifications regarding this demand."
                                type="email"
                                value={groupEmail}
                                onChange={(e) => setGroupEmail(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        bgcolor: "#f8fafc",
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<Send size={16} />}
                                sx={{
                                    mt: 1.5,
                                    py: 1.3,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: "0.9rem",
                                    bgcolor: PRIMARY,
                                    "&:hover": { bgcolor: `${PRIMARY}E6` },
                                    boxShadow: "none",
                                }}
                            >
                                Create Demand
                            </Button>
                        </Box>
                    </Paper>

                    {/* ── Right: Manage User Group ── */}
                    <Paper
                        variant="outlined"
                        sx={{
                            px: 4,
                            py: 2,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "divider",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        {/* Section Header */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box
                                sx={{
                                    p: 1,
                                    bgcolor: `${PRIMARY}1A`,
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <UserCog size={22} color={PRIMARY} />
                            </Box>
                            <Typography variant="h6" fontWeight={700} color="text.primary">
                                Manage User Group
                            </Typography>
                        </Box>

                        {/* Content */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                            <CustomSelectInput
                                label="User Group"
                                placeholder="Select a user group"
                                description="Please select a user group to manage it."
                                options={USER_GROUP_OPTIONS}
                                value={selectedGroup}
                                onChange={(value) => setSelectedGroup(value != null ? String(value) : "")}
                            />

                            {selectedGroup && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                    <TableContainer
                                        component={Paper}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 2,
                                            maxHeight: "28vh",
                                            "&::-webkit-scrollbar": { width: 6 },
                                            "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(0,0,0,0.1)", borderRadius: 3 }
                                        }}
                                    >
                                        <Table stickyHeader size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc", color: "text.secondary" }}>Name</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 600, bgcolor: "#f8fafc", color: "text.secondary", width: 100 }}>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {USERS_LIST.map((user) => {
                                                    const isAdded = usersInGroup.some(u => u.value === user.value);
                                                    return (
                                                        <TableRow key={user.value} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                            <TableCell sx={{ color: "text.primary", fontWeight: 500 }}>{user.label}</TableCell>
                                                            <TableCell align="right">
                                                                <Button
                                                                    size="small"
                                                                    variant={isAdded ? "outlined" : "contained"}
                                                                    color={isAdded ? "error" : "primary"}
                                                                    onClick={() => {
                                                                        if (isAdded) {
                                                                            setUsersInGroup(usersInGroup.filter(u => u.value !== user.value));
                                                                        } else {
                                                                            setUsersInGroup([...usersInGroup, user]);
                                                                        }
                                                                    }}
                                                                    sx={{
                                                                        borderRadius: 1.5,
                                                                        textTransform: "none",
                                                                        fontWeight: 600,
                                                                        boxShadow: "none",
                                                                        "&:hover": { boxShadow: "none" }
                                                                    }}
                                                                >
                                                                    {isAdded ? "Remove" : "Add"}
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}

                            <Box
                                sx={{
                                    mt: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    borderTop: "1px solid",
                                    borderColor: "divider",
                                    pt: 3,
                                }}
                            >
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: PRIMARY,
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                    }}
                                >
                                    <PowerOff size={16} />
                                    Click here to deactivate bulk live rules.
                                </Link>
                                <Link
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: PRIMARY,
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                    }}
                                >
                                    <RefreshCw size={16} />
                                    Click here to update rule status.
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewDemand;
