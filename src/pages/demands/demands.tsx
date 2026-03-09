import { useState } from "react";
import MaterialTable from "../../components/tables/material-table/material-table";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    TrendingUp,
    Users,
    CalendarDays,
    Plus,
    Globe,
} from "lucide-react";
import CreateNewDemand from "./components/create-new-demand/create-new-demand";

type Status = "Active" | "Inactive";

type Demand = {
    name: string;
    status: Status;
    description: string;
    market: string;
};

const STATUS_CONFIG: Record<Status, { bg: string; color: string; dotColor: string; pulse: boolean }> = {
    Active: { bg: "#F0FDF4", color: "#15803D", dotColor: "#22C55E", pulse: false },
    Inactive: { bg: "#F1F5F9", color: "#64748B", dotColor: "#94A3B8", pulse: false },
};

const ALL_DATA: Demand[] = [
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
];

const StatusChip = ({ status }: { status: Status }) => {
    const cfg = STATUS_CONFIG[status];
    return (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.25, py: 0.5, borderRadius: "999px", bgcolor: cfg.bg }}>
            <Box
                sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: cfg.dotColor,
                    ...(cfg.pulse && { animation: "pulse 1.5s ease-in-out infinite" }),
                }}
            />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: cfg.color, lineHeight: 1 }}>
                {status}
            </Typography>
        </Box>
    );
};

const ActionButtons = () => (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        <Tooltip title="Click To High Level Demand" arrow>
            <IconButton
                size="small"
                sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
            >
                <TrendingUp size={16} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Click To User Rule" arrow>
            <IconButton
                size="small"
                sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
            >
                <Users size={16} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Click To Rule Scheduler" arrow>
            <IconButton
                size="small"
                sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
            >
                <CalendarDays size={16} />
            </IconButton>
        </Tooltip>
    </Box>
);

const COLUMNS: MRT_ColumnDef<Demand>[] = [
    {
        header: "Demand Name",
        accessorKey: "name",
        size: 240,
        Cell: ({ row }) => (
            <Box>
                <Typography variant="body2" color="text.secondary">
                    {row.original.name}
                </Typography>
            </Box>
        ),
    },
    {
        header: "Status",
        accessorKey: "status",
        size: 100,
        Cell: ({ cell }) => <StatusChip status={cell.getValue<Status>()} />,
    },
    {
        header: "Description",
        accessorKey: "description",
        size: 300,
        Cell: ({ cell }) => {
            const full = cell.getValue<string>();
            const words = full.split(' ');
            const preview = words.length > 5 ? words.slice(0, 5).join(' ') + '…' : full;
            return (
                <Tooltip title={full} placement="top" arrow>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: 'nowrap', cursor: 'default' }}
                    >
                        {preview}
                    </Typography>
                </Tooltip>
            );
        },
    },
    {
        header: "Market",
        accessorKey: "market",
        size: 160,
        Cell: ({ cell }) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Globe size={15} color="#94A3B8" />
                <Typography variant="body2" color="text.secondary">
                    {cell.getValue<string>()}
                </Typography>
            </Box>
        ),
    },
    {
        header: "Actions",
        id: "actions",
        size: 130,
        enableSorting: false,
        muiTableHeadCellProps: { align: "center" },
        Cell: () => <ActionButtons />,
    },
];

const Demands = () => {
    const [createOpen, setCreateOpen] = useState(false);
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
                        Demand Selection
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Centralized control for market resource planning and monitoring
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={16} />}
                        onClick={() => setCreateOpen(true)}
                        sx={{
                            height: 40,
                            borderRadius: 2,
                            fontWeight: 500,
                            textTransform: "none",
                            backgroundColor: '#005EEF',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                            }
                        }}
                    >
                        Create New Demand
                    </Button>
                </Box>
            </Box>

            {/* ── Table (no embedded top toolbar) ── */}
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <MaterialTable
                    columns={COLUMNS}
                    data={ALL_DATA}
                    options={{ enableTopToolbar: true }}
                />
            </Box>

            {/* Keyframe for pulsing dot */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            {/* ── Create New Demand Dialog ── */}
            <CreateNewDemand open={createOpen} onClose={() => setCreateOpen(false)} />
        </Box>
    );
};

export default Demands;