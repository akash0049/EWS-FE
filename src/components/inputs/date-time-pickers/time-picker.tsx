import { forwardRef, useId } from "react";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker, type TimePickerProps } from '@mui/x-date-pickers/TimePicker';

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
export interface CustomTimePickerProps
    extends Omit<TimePickerProps, "label"> {
    /** Static label rendered above the input (Mantine-style) */
    label?: string;
    /** Sub-label / hint rendered below the input */
    description?: string;
    /**
     * When `error` is true and this is provided it replaces `description`.
     */
    errorMessage?: string;
    /** Standard HTML required attribute */
    required?: boolean;
    /** Error state */
    error?: boolean;
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const CustomTimePicker = forwardRef<HTMLDivElement, CustomTimePickerProps>(
    (
        {
            label,
            description,
            errorMessage,
            required = false,
            error = false,
            disabled = false,
            readOnly = false,
            sx,
            slotProps,
            ...rest
        },
        ref
    ) => {
        const autoId = useId();
        const inputId = autoId;

        const helperText = error ? (errorMessage ?? description) : description;

        return (
            <Box
                ref={ref}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    ...(typeof sx === "function" ? undefined : sx),
                }}
            >
                {/* ── Mantine-style external label ── */}
                {label && (
                    <Typography
                        component="label"
                        htmlFor={inputId}
                        sx={{
                            display: "inline-flex",
                            alignItems: "baseline",
                            gap: "2px",
                            fontSize: "clamp(10px, 12px, 14px)",
                            fontWeight: 500,
                            color: disabled ? "text.disabled" : "text.primary",
                            mb: "4px",
                            lineHeight: 1.2,
                            userSelect: "none",
                        }}
                    >
                        {label}

                        {required && (
                            <Box
                                component="span"
                                aria-hidden="true"
                                sx={{
                                    color: "error.main",
                                    fontSize: "clamp(10px, 12px, 14px)",
                                    lineHeight: 1,
                                    ml: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                *
                            </Box>
                        )}
                    </Typography>
                )}

                {/* ── MUI TimePicker ── */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        disabled={disabled}
                        readOnly={readOnly}
                        slotProps={{
                            ...slotProps,
                            textField: {
                                id: inputId,
                                error: error,
                                required: required,
                                fullWidth: true,
                                size: "small",
                                ...((slotProps?.textField as Record<string, unknown>) ?? {}),
                                sx: {
                                    "& .MuiPickersOutlinedInput-root": {
                                        height: '35px',
                                        fontSize: "clamp(10px, 12px, 14px)",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& legend": { display: "none" },
                                        "& fieldset": { top: 0 },
                                        borderRadius: "4px",
                                        backgroundColor: "#FFFFFF",
                                        "&.Mui-readOnly": {
                                            backgroundColor: "#f8fafc",
                                            cursor: "default",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        fontSize: "clamp(10px, 12px, 14px)",
                                        "&::placeholder": {
                                            fontSize: "clamp(10px, 12px, 14px)",
                                        },
                                        "&.Mui-readOnly": {
                                            color: "text.secondary",
                                        }
                                    },
                                    ...(((slotProps?.textField as Record<string, unknown>)?.sx as object) ?? {})
                                }
                            }
                        }}
                        {...rest}
                    />
                </LocalizationProvider>

                {/* ── Mantine-style description / error message ── */}
                {helperText && (
                    <Typography
                        sx={{
                            mt: "6px",
                            fontSize: "clamp(6px, 8px, 10px)",
                            lineHeight: 1.45,
                            color: error ? "error.main" : "text.secondary",
                        }}
                    >
                        {helperText}
                    </Typography>
                )}
            </Box>
        );
    }
);

CustomTimePicker.displayName = "CustomTimePicker";

export default CustomTimePicker;
