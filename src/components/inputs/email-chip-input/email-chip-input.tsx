import { forwardRef, useId, useState, useRef, type KeyboardEvent, type ClipboardEvent } from "react";
import {
    Box,
    Typography,
    Chip,
    IconButton,
    InputBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
export interface EmailChipInputProps {
    /** Static label rendered above the input (Mantine-style) */
    label?: string;
    /** Sub-label / hint rendered below the input */
    description?: string;
    /** Placeholder shown in the text input */
    placeholder?: string;
    /** Error state */
    error?: boolean;
    /** Error message shown when error is true */
    errorMessage?: string;
    /** Required asterisk */
    required?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Controlled list of emails */
    value: string[];
    /** Called whenever the emails list changes */
    onChange: (emails: string[]) => void;
    /** Custom id */
    id?: string;
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim());

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const EmailChipInput = forwardRef<HTMLDivElement, EmailChipInputProps>(
    (
        {
            label,
            description,
            placeholder = "example@company.com",
            error = false,
            errorMessage,
            required = false,
            disabled = false,
            value,
            onChange,
            id: idProp,
        },
        ref
    ) => {
        const autoId = useId();
        const inputId = idProp ?? autoId;
        const inputRef = useRef<HTMLInputElement>(null);

        const [inputValue, setInputValue] = useState("");
        const [localError, setLocalError] = useState("");


        const isError = error || !!localError;

        /* ── Add an email chip ── */
        const addEmail = (raw: string) => {
            const email = raw.trim().replace(/,$/, "").trim();
            if (!email) return;

            if (!isValidEmail(email)) {
                setLocalError(`"${email}" is not a valid email address`);
                return;
            }

            if (value.includes(email)) {
                setLocalError(`"${email}" is already added`);
                setInputValue("");
                return;
            }

            setLocalError("");
            onChange([...value, email]);
            setInputValue("");
        };

        /* ── Remove an email chip ── */
        const removeEmail = (index: number) => {
            onChange(value.filter((_, i) => i !== index));
        };

        /* ── Clear all ── */
        const clearAll = () => {
            onChange([]);
            setInputValue("");
            setLocalError("");
            inputRef.current?.focus();
        };

        /* ── Key handler ── */
        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "," || e.key === "Enter") {
                e.preventDefault();
                addEmail(inputValue);
            } else if (
                e.key === "Backspace" &&
                inputValue === "" &&
                value.length > 0
            ) {
                removeEmail(value.length - 1);
            }
        };

        /* ── Paste handler (supports comma-separated paste) ── */
        const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
            const pasted = e.clipboardData.getData("text");
            if (pasted.includes(",")) {
                e.preventDefault();
                const parts = pasted.split(",").map((s) => s.trim()).filter(Boolean);
                const newEmails: string[] = [];
                for (const part of parts) {
                    if (isValidEmail(part) && !value.includes(part) && !newEmails.includes(part)) {
                        newEmails.push(part);
                    }
                }
                if (newEmails.length > 0) {
                    onChange([...value, ...newEmails]);
                    setLocalError("");
                }
            }
        };

        const showClear = value.length > 0 || inputValue.length > 0;

        return (
            <Box
                ref={ref}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                {/* ── External label ── */}
                {label && (
                    <Typography
                        component="label"
                        htmlFor={inputId}
                        sx={{
                            display: "inline-flex",
                            alignItems: "baseline",
                            gap: "2px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: disabled ? "text.disabled" : "text.primary",
                            mb: 1,
                            lineHeight: 1.4,
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
                                    fontSize: "0.75rem",
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

                {/* ── Input container ── */}
                <Box
                    onClick={() => inputRef.current?.focus()}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid",
                        borderColor: isError
                            ? "error.main"
                            : "rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        backgroundColor: "#FFFFFF",
                        minHeight: "35px",
                        px: "8px",
                        py: "8px",
                        cursor: "text",
                        transition: "border-color 0.2s ease",
                        "&:hover": {
                            borderColor: isError
                                ? "error.main"
                                : "rgba(0, 0, 0, 0.87)",
                        },
                        "&:focus-within": {
                            borderColor: isError
                                ? "error.main"
                                : "primary.main",
                            boxShadow: (theme) => `inset 0 0 0 1px ${isError ? theme.palette.error.main : theme.palette.primary.main}`,
                        },
                    }}
                >
                    {/* ── Chips + input area ── */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap", // Allow wrapping for multi-line layout
                            overflowY: "auto", // Vertical scroll if many emails
                            gap: "8px",
                            alignItems: "flex-start", // Top align like a textarea
                            alignContent: "flex-start",
                            flex: 1,
                            minWidth: 0,
                            height: "70px", // Fixed height for textarea feel
                            /* ── Custom Scrollbar Styling (Webkit) ── */
                            "&::-webkit-scrollbar": {
                                width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "rgba(0,0,0,0.1)",
                                borderRadius: "10px",
                                "&:hover": {
                                    background: "rgba(0,0,0,0.2)",
                                },
                            },
                        }}
                    >
                        {value.map((email, index) => (
                            <Chip
                                key={email}
                                label={email}
                                size="small"
                                onDelete={
                                    disabled ? undefined : () => removeEmail(index)
                                }
                                sx={{
                                    height: "24px",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                                    color: "primary.dark",
                                    borderRadius: "6px",
                                    ".MuiChip-label": {
                                        px: "8px",
                                    },
                                    ".MuiChip-deleteIcon": {
                                        fontSize: "0.85rem",
                                        color: "primary.main",
                                        "&:hover": {
                                            color: "error.main",
                                        },
                                    },
                                }}
                            />
                        ))}

                        <InputBase
                            id={inputId}
                            inputRef={inputRef}
                            value={inputValue}
                            onChange={(e) => {
                                const val = e.target.value;
                                // If user types a comma, trigger add
                                if (val.endsWith(",")) {
                                    addEmail(val);
                                } else {
                                    setInputValue(val);
                                    if (localError) setLocalError("");
                                }
                            }}
                            onKeyDown={handleKeyDown}
                            onPaste={handlePaste}
                            onBlur={() => {
                                if (inputValue.trim()) {
                                    addEmail(inputValue);
                                }
                            }}
                            placeholder={
                                value.length === 0 ? placeholder : ""
                            }
                            disabled={disabled}
                            type="email"
                            sx={{
                                flex: 1,
                                minWidth: "120px",
                                fontSize: "0.8rem",
                                "& input": {
                                    padding: "2px 4px",
                                    height: "20px",
                                    "&::placeholder": {
                                        fontSize: "0.8rem",
                                    },
                                },
                            }}
                        />
                    </Box>

                    {/* ── Clear all button ── */}
                    {showClear && !disabled && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAll();
                            }}
                            aria-label="Clear all emails"
                            sx={{
                                ml: "4px",
                                p: "2px",
                                color: "text.secondary",
                                flexShrink: 0,
                                "&:hover": {
                                    color: "error.main",
                                    backgroundColor: "rgba(211, 47, 47, 0.04)",
                                },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "1rem" }} />
                        </IconButton>
                    )}
                </Box>

                {/* ── Description ── */}
                {description && (
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: "clamp(7.5px, 9.5px, 11.5px)",
                            lineHeight: 1.45,
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* ── Error Messages (External or Local) ── */}
                {isError && (
                    <Typography
                        sx={{
                            mt: "4px",
                            fontSize: "clamp(7.5px, 9.5px, 11.5px)",
                            lineHeight: 1.45,
                            color: "error.main",
                        }}
                    >
                        {errorMessage || localError || (error && "Invalid input")}
                    </Typography>
                )}
            </Box>
        );
    }
);

EmailChipInput.displayName = "EmailChipInput";

export default EmailChipInput;
