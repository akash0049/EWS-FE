import {useState} from 'react';
import { Box, Button } from "@mui/material";
import type { Demand } from "../constants/types";
import CustomTextInput from "../../../components/inputs/text-input/text-input";
import EmailChipInput from "../../../components/inputs/email-chip-input/email-chip-input";
import CustomDialog from '../../../components/dialogs/custom-dialog';

interface CreateNewDemandProps {
    open: boolean;
    onClose: () => void;
    onCreate: (demand: Demand) => void;
}

const CreateNewDemand = ({ open, onClose, onCreate }: CreateNewDemandProps) => {
    const [demandName, setDemandName] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [groupEmails, setGroupEmails] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ demandName?: string; userGroup?: string }>({});

    const handleClose = () => {
        setDemandName("");
        setUserGroup("");
        setGroupEmails([]);
        setErrors({});
        onClose();
    };

    const validateForm = () => {
        const newErrors: { demandName?: string; userGroup?: string } = {};
        if (!demandName.trim()) {
            newErrors.demandName = "Project Demand Name is required";
        }
        if (!userGroup.trim()) {
            newErrors.userGroup = "User Group is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        
        if (onCreate) {
            onCreate({
                name: demandName,
                status: "Active",
                description: '',
                market: "Global",
            });
            handleClose();
        }
    };
    
    return (
        <CustomDialog
            open={open}
            onClose={handleClose}
            height='90vh'
            width='40vw'
            title='Create New Demand'
            description='New Demand to be created by DQ Engagement Team'
            content = {
                <Box
                    sx={{
                        px: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <CustomTextInput
                            label="Project Demand Name"
                            placeholder="Enter demand name"
                            required
                            value={demandName}
                            error={!!errors.demandName}
                            errorMessage={errors.demandName}
                            onChange={(e) => {
                                setDemandName(e.target.value);
                                if (errors.demandName) setErrors((prev) => ({ ...prev, demandName: undefined }));
                            }}
                        />
                        <CustomTextInput
                            label="User Group"
                            placeholder="Enter user group"
                            description="Follow the naming convention: Product_Group_Region_XXXX (e.g. Dove_Admin_Global_0001)"
                            required
                            value={userGroup}
                            error={!!errors.userGroup}
                            errorMessage={errors.userGroup}
                            onChange={(e) => {
                                setUserGroup(e.target.value);
                                if (errors.userGroup) setErrors((prev) => ({ ...prev, userGroup: undefined }));
                            }}
                        />
                        <EmailChipInput
                            label="Group Email(s)"
                            placeholder="E.g. abc@unilever.com, xyz@unilever.com"
                            description="List of comma separated emails IDs that will receive notifications for this demand."
                            value={groupEmails}
                            onChange={setGroupEmails}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit} 
                        >
                            Create Demand
                        </Button>
                    </Box>
                </Box>
            }
        />
    );
};

export default CreateNewDemand;