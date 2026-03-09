import { useState } from "react";
import { Box, Drawer, IconButton, Typography, Button } from "@mui/material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";
import CustomTextInput from "../../../components/inputs/text-input/text-input";
import {
    X
} from "lucide-react";

const PRIMARY = "#0d7ff2";

interface Props {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}

/* ── Available Users to Add ── */
const JIRA_ID_LIST = [
    { value: "DDA-890", label: "DDA-890" },
    { value: "DDA-1024", label: "DDA-1024" },
    { value: "DDA-3465", label: "DDA-3465" },
];

const DemandDetails = ({ open, toggleDrawer }: Props) => {
    const [jiraId, setJiraId] = useState("");
    const [jiraDescription, setJiraDescription] = useState("");

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)}
            sx={{
                zIndex: 9999,
                "& .MuiDrawer-paper": {
                    width: 600,   // change width here
                },
            }}
        >
            <Box sx={{
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}>

                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Demand Details
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        Demand: Net_Productivity [372]
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => toggleDrawer(false)}
                    size="small"
                    sx={{
                        mt: 0,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <X size={18} />
                </IconButton>
            </Box>
            <Box sx={{
                p: 3, display: "flex",
                flexDirection: 'column',
                gap: 2
            }}>
                <CustomSelectInput
                    label="JIRA ID"
                    placeholder="Select a JIRA ID"
                    required
                    options={JIRA_ID_LIST}
                    value={jiraId}
                    onChange={(value) => setJiraId(value != null ? String(value) : "")}
                />

                <CustomTextInput
                    label="JIRA Description"
                    placeholder="Enter JIRA Description"
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    label="Demand Description"
                    placeholder="Enter Demand Description"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    label="Market"
                    placeholder="Enter Market"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    label="Use Case"
                    placeholder="Enter Use Case"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    label="Benefits"
                    placeholder="Enter Benefits"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                        },
                    }}
                />

                <CustomSelectInput
                    label="Demand Owner"
                    placeholder="Select a Demand Owner"
                    required
                    options={JIRA_ID_LIST}
                    value={jiraId}
                    onChange={(value) => setJiraId(value != null ? String(value) : "")}
                />

                <CustomSelectInput
                    label="Demand SPOC"
                    placeholder="Select a Demand SPOC"
                    required
                    options={JIRA_ID_LIST}
                    value={jiraId}
                    onChange={(value) => setJiraId(value != null ? String(value) : "")}
                />

                <CustomSelectInput
                    label="Function SME"
                    placeholder="Select a Function SME"
                    required
                    options={JIRA_ID_LIST}
                    value={jiraId}
                    onChange={(value) => setJiraId(value != null ? String(value) : "")}
                />

                <CustomTextInput
                    label="Resolver Group Name"
                    placeholder="Enter Resolver Group Name"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    placeholder="Enter User Group"
                    required
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
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
                    sx={{
                        mt: 1,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        bgcolor: PRIMARY,
                        "&:hover": { bgcolor: `${PRIMARY}E6` },
                        boxShadow: "none",
                    }}
                >
                    Save
                </Button>
            </Box>
        </Drawer>

    );
};

export default DemandDetails;