import { useState, useMemo } from "react";
import { Box, Typography, alpha, useTheme, Button } from "@mui/material";
import { PersonAdd, PersonRemove, MarkEmailRead, Unsubscribe } from "@mui/icons-material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";
import CustomSearchInput from "../../../components/inputs/search-input/search-input";
import CustomDialog from '../../../components/dialogs/custom-dialog';
import CustomIconButton from '../../../components/buttons/icon-button/icon-button';

import { USER_GROUP_OPTIONS, USERS_LIST } from '../constants/data'

function getInitials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

interface ManageUserGroupsProps {
    open: boolean;
    onClose: () => void;
}

export default function ManageUserGroups({ open, onClose }: ManageUserGroupsProps) {
    const theme = useTheme();
    const [selectedGroup, setSelectedGroup] = useState(USER_GROUP_OPTIONS[0].value);
    const [usersInGroup, setUsersInGroup] = useState<typeof USERS_LIST>([]);
    const [usersWithEmail, setUsersWithEmail] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = useMemo(() => {
        if (!searchQuery.trim()) return USERS_LIST;
        const q = searchQuery.toLowerCase();
        return USERS_LIST.filter(
            (u) =>
                u.label.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const handleToggleUser = (user: (typeof USERS_LIST)[number]) => {
        const isAdded = usersInGroup.some((u) => u.value === user.value);
        if (isAdded) {
            setUsersInGroup(usersInGroup.filter((u) => u.value !== user.value));
            // Remove from email list too if user is removed from group
            setUsersWithEmail(usersWithEmail.filter(email => email !== user.value));
        } else {
            setUsersInGroup([...usersInGroup, user]);
        }
    };

    const handleToggleEmail = (userId: string) => {
        if (usersWithEmail.includes(userId)) {
            setUsersWithEmail(usersWithEmail.filter(id => id !== userId));
        } else {
            setUsersWithEmail([...usersWithEmail, userId]);
        }
    };

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            title='Manage User Groups'
            description='Manage users groups for specific demand.'
            content = {
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
                    <CustomSelectInput
                        label="User Group"
                        placeholder="Select a user group"
                        options={USER_GROUP_OPTIONS}
                        value={selectedGroup}
                        onChange={(value) =>
                            setSelectedGroup(
                                value != null ? String(value) : ""
                            )
                        }
                    />
                    {selectedGroup && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        {/* ── Header: "Manage Members" + Search ── */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: { xs: "stretch", sm: "center" },
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                gap: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.15em",
                                    color: "text.secondary",
                                }}
                            >
                                Manage Members
                            </Typography>

                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <CustomSearchInput
                                    placeholder="Search members..."
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    width={{ xs: "100%", sm: 240 }}
                                    />
                                <Button 
                                    variant="outlined" 
                                    onClick={() => {}} 
                                    >
                                    Save Changes
                                </Button>
                            </Box>
                        </Box>

                        {/* ── Card Grid Container (Scrollable) ── */}
                        <Box
                            sx={{
                                flex: 1,
                                minHeight: 0,
                                overflowY: "auto",
                                overflowX: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "1fr 1fr",
                                        md: "1fr 1fr 1fr",
                                    },
                                    gap: 1,
                                }}
                            >
                                {filteredUsers.map((user) => {
                                    const isAdded = usersInGroup.some(
                                        (u) => u.value === user.value
                                    );

                                    return (
                                        <Box
                                            key={user.value}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                p: 1.5,
                                                bgcolor: isAdded
                                                    ? "background.paper"
                                                    : "action.hover",
                                                border: "1px solid",
                                                borderColor: isAdded
                                                    ? alpha(theme.palette.primary.main, 0.2)
                                                    : "transparent",
                                                borderRadius: 2,
                                                boxShadow: isAdded
                                                    ? "0 1px 3px rgba(0,0,0,0.08)"
                                                    : "none",
                                                transition: "all 0.15s ease",
                                                "&:hover": {
                                                    bgcolor: "background.paper",
                                                    borderColor: isAdded
                                                        ? alpha(theme.palette.primary.main, 0.4)
                                                        : alpha(theme.palette.divider, 0.3),
                                                },
                                            }}
                                        >
                                            {/* ── Avatar + Name ── */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1.25,
                                                    minWidth: 0,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 1,
                                                        bgcolor: isAdded
                                                            ? alpha(theme.palette.primary.main, 0.1)
                                                            : "action.hover",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "0.6rem",
                                                            fontWeight: 700,
                                                            color: isAdded
                                                                ? "primary.main"
                                                                : "text.secondary",
                                                        }}
                                                    >
                                                        {getInitials(user.label)}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "0.75rem",
                                                            fontWeight: isAdded ? 700 : 500,
                                                            color: "text.primary",
                                                            lineHeight: 1.3,
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}
                                                    >
                                                        {user.label}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* ── Action Buttons ── */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                {/* ── Email Notification Button ── */}
                                                {isAdded && (
                                                    <CustomIconButton
                                                        title={usersWithEmail.includes(user.value) ? "Disable Email Notification" : "Enable Email Notification"}
                                                        size="small"
                                                        icon={
                                                            usersWithEmail.includes(user.value) ? (
                                                                <MarkEmailRead sx={{ fontSize: 18 }} />
                                                            ) : (
                                                                <Unsubscribe sx={{ fontSize: 18 }} />
                                                            )
                                                        }
                                                        color={usersWithEmail.includes(user.value) ? "primary.main" : "text.disabled"}
                                                        bgcolor={alpha(theme.palette.primary.main, 0.08)}
                                                        onClick={() => handleToggleEmail(user.value)}
                                                    />
                                                )}

                                                {/* ── Add / Remove Button ── */}
                                                <CustomIconButton
                                                    title={isAdded ? "Remove User" : "Add User"}
                                                    size="small"
                                                    icon={
                                                        isAdded ? (
                                                            <PersonRemove sx={{ fontSize: 18 }} />
                                                        ) : (
                                                            <PersonAdd sx={{ fontSize: 18 }} />
                                                        )
                                                    }
                                                    color={isAdded ? "error.main" : "primary.main"}
                                                    bgcolor={isAdded ? alpha(theme.palette.error.main, 0.08) : alpha(theme.palette.primary.main, 0.08)}
                                                    onClick={() => handleToggleUser(user)}
                                                />
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            {filteredUsers.length === 0 && (
                                <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "text.disabled",
                                        }}
                                    >
                                        No users match your search.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                )}
                </Box>
            }
        />
    );
}
