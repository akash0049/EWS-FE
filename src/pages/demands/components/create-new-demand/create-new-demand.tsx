import { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    Popper,
    ClickAwayListener,
    Grow,
    InputAdornment,
} from "@mui/material";
import {
    CirclePlus,
    UserCog,
    Send,
    PowerOff,
    RefreshCw,
    ArrowLeft,
    ChevronDown,
    Check,
    Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#0d7ff2";

/* ── Mantine-style user group options ── */
const USER_GROUP_OPTIONS = [
    { value: "admin", label: "Administrators" },
    { value: "dev", label: "Developers" },
    { value: "qa", label: "QA Team" },
    { value: "analyst", label: "Data Analysts" },
];

/* ── Mantine-style Select Component ── */
const MantineSelect = ({
    label,
    placeholder,
    options,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (val: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const anchorRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const selectedLabel = options.find((o) => o.value === value)?.label ?? "";
    const filtered = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (open && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 80);
        }
        if (!open) setSearch("");
    }, [open]);

    return (
        <Box sx={{ position: "relative" }}>
            {/* Label */}
            <Typography
                component="label"
                sx={{
                    display: "block",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    mb: 0.6,
                }}
            >
                {label} <span style={{ color: "#fa5252" }}>*</span>
            </Typography>

            {/* Trigger */}
            <Box
                ref={anchorRef}
                onClick={() => setOpen((p) => !p)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    border: open ? `1.5px solid ${PRIMARY}` : "1.5px solid #dee2e6",
                    bgcolor: "#f8fafc",
                    px: 1.5,
                    py: 1,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: open ? `0 0 0 2px ${PRIMARY}26` : "none",
                    "&:hover": {
                        borderColor: open ? PRIMARY : "#adb5bd",
                    },
                    minHeight: 40,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "0.875rem",
                        color: value ? "text.primary" : "#adb5bd",
                        userSelect: "none",
                    }}
                >
                    {selectedLabel || placeholder}
                </Typography>
                <ChevronDown
                    size={18}
                    color="#868e96"
                    style={{
                        transition: "transform 0.2s ease",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </Box>

            {/* Dropdown */}
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1300, width: anchorRef.current?.offsetWidth ?? "100%" }}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: "top left" }} timeout={150}>
                        <Box>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        mt: 0.5,
                                        border: "1px solid #e9ecef",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Search input */}
                                    <Box sx={{ p: 1, borderBottom: "1px solid #f1f3f5" }}>
                                        <TextField
                                            inputRef={searchRef}
                                            placeholder="Search..."
                                            size="small"
                                            fullWidth
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search size={15} color="#adb5bd" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "6px",
                                                    bgcolor: "#f8f9fa",
                                                    fontSize: "0.84rem",
                                                    "& fieldset": { borderColor: "#e9ecef" },
                                                    "&:hover fieldset": { borderColor: "#dee2e6" },
                                                    "&.Mui-focused fieldset": { borderColor: `${PRIMARY}80`, borderWidth: 1 },
                                                },
                                                "& .MuiOutlinedInput-input": { py: 0.8 },
                                            }}
                                        />
                                    </Box>

                                    {/* Options */}
                                    <Box sx={{ maxHeight: 200, overflowY: "auto", py: 0.5, px: 0.5 }}>
                                        {filtered.length === 0 ? (
                                            <Typography
                                                sx={{
                                                    py: 2,
                                                    textAlign: "center",
                                                    fontSize: "0.82rem",
                                                    color: "text.disabled",
                                                }}
                                            >
                                                No results found
                                            </Typography>
                                        ) : (
                                            filtered.map((opt) => {
                                                const isSelected = value === opt.value;
                                                return (
                                                    <Box
                                                        key={opt.value}
                                                        onClick={() => {
                                                            onChange(opt.value);
                                                            setOpen(false);
                                                        }}
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            px: 1.5,
                                                            py: 0.9,
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontSize: "0.86rem",
                                                            fontWeight: isSelected ? 500 : 400,
                                                            color: isSelected ? PRIMARY : "text.primary",
                                                            bgcolor: isSelected ? `${PRIMARY}0D` : "transparent",
                                                            transition: "all 0.12s ease",
                                                            "&:hover": {
                                                                bgcolor: isSelected ? `${PRIMARY}14` : "#f1f3f5",
                                                            },
                                                        }}
                                                    >
                                                        {opt.label}
                                                        {isSelected && <Check size={15} color={PRIMARY} />}
                                                    </Box>
                                                );
                                            })
                                        )}
                                    </Box>
                                </Paper>
                            </ClickAwayListener>
                        </Box>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

const CreateNewDemand = () => {
    const navigate = useNavigate();

    const [demandName, setDemandName] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [groupEmail, setGroupEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
            {/* ── Page Header ── */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        Create New Demand
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        New Demand to be created by DQ Engagement Team
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowLeft size={16} />}
                        onClick={() => navigate("/")}
                        sx={{
                            height: 40,
                            borderRadius: 2,
                            fontWeight: 500,
                            textTransform: "none",
                            borderColor: PRIMARY,
                            color: PRIMARY,
                            "&:hover": {
                                borderColor: PRIMARY,
                                backgroundColor: `${PRIMARY}0A`,
                            },
                        }}
                    >
                        Back to Demands
                    </Button>
                </Box>
            </Box>

            {/* ── Two-Column Grid ── */}
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                    gap: 3,
                    mt: 1,
                }}
            >
                {/* ── Left: Create New Demand ── */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {/* Section Header */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
                    </Box>

                    {/* Form Fields */}
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <TextField
                            label="Project Demand Name"
                            placeholder="Enter demand name"
                            required
                            fullWidth
                            size="small"
                            value={demandName}
                            onChange={(e) => setDemandName(e.target.value)}
                            InputLabelProps={{
                                sx: { fontSize: "0.85rem", fontWeight: 600 },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="User Group"
                            placeholder="Specify user group"
                            required
                            fullWidth
                            size="small"
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
                            InputLabelProps={{
                                sx: { fontSize: "0.85rem", fontWeight: 600 },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Group Email"
                            placeholder="example@company.com"
                            type="email"
                            required
                            fullWidth
                            size="small"
                            value={groupEmail}
                            onChange={(e) => setGroupEmail(e.target.value)}
                            InputLabelProps={{
                                sx: { fontSize: "0.85rem", fontWeight: 600 },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    bgcolor: "#f8fafc",
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: PRIMARY,
                                    },
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
                                "&:hover": {
                                    bgcolor: `${PRIMARY}E6`,
                                },
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
                        p: 4,
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
                        {/* Select User Group - Mantine-style */}
                        <MantineSelect
                            label="User Group"
                            placeholder="Select a user group"
                            options={USER_GROUP_OPTIONS}
                            value={selectedGroup}
                            onChange={setSelectedGroup}
                        />

                        {/* Manage Button */}
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    fontSize: "0.9rem",
                                    borderWidth: 2,
                                    borderColor: PRIMARY,
                                    color: PRIMARY,
                                    "&:hover": {
                                        borderWidth: 2,
                                        borderColor: PRIMARY,
                                        bgcolor: `${PRIMARY}0D`,
                                    },
                                }}
                            >
                                Manage User Group
                            </Button>
                        </Box>

                        {/* Bottom Links */}
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
        </Box>
    );
};

export default CreateNewDemand;
