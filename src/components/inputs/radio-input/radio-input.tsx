import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography
} from "@mui/material";

interface RadioInputProps {
    label: string;
    value: string;
    radioList: { value: string, label: string }[],
    setValue: (value: string) => void
}

const RadioInput = ({ label, value, radioList, setValue }: RadioInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl>
            <FormLabel
                id="radio-buttons-group-label"
                sx={{
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 600
                }}
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                value={value}
                name="radio-buttons-group"
                onChange={handleChange}
            >
                {radioList.map(({ value, label }) => (
                    <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={
                            <Typography
                                sx={{
                                    fontSize: 'clamp(8px, 10px, 12px)'
                                }}>
                                {label}
                            </Typography>}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioInput