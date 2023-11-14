import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function Asynchronous({ setModalDataLots, modalDataLots, data, questions, disabled, onChange }) {
    // value is "201"
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1); // For demo purposes.

            if (active) {
                setOptions([...questions]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, questions]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);



    const defaultValue = questions.find((option) => option.code === data?.code);
    questions.sort((a, b) => (a.code > b.code ? 1 : -1));

    const handleOnChange = (event, value) => {
        console.log(options)
        console.log(modalDataLots)
        try {
            let state = { ...modalDataLots };
            let questions = state.questions;
            let index = questions.indexOf(data);
            console.log(event.target.name)
            if (event.target.name === "color")
                questions[index] = { ...questions[index], color: event.target.value }
            else
                questions[index] = { ...questions[index], code: value.code }
            state.questions = questions;
            console.log(questions)
            setModalDataLots(state);
        }
        catch {
            console.log("ERRO")
        }
    };

    return (
        <>
            <Autocomplete
                disabled={disabled}
                fullWidth
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option?.code === value?.code}
                getOptionLabel={(option) => `${option.code} ${option.text}`}
                options={options}
                loading={loading}
                onChange={handleOnChange}
                value={defaultValue}
                renderInput={(params) => (
                    <TextField
                        sx={{ marginBottom: 1 }}
                        fullWidth
                        {...params}
                        name="code"
                        label="Select Question"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <FormControl sx={{ width: "25%", marginLeft: "5px" }}>
                <InputLabel>Color</InputLabel>
                <Select
                    name="color"
                    value={data.color}
                    label="Color"
                    disabled={disabled}

                    onChange={handleOnChange}
                >
                    <MenuItem value={"RED"}>Red</MenuItem>
                    <MenuItem value={"NONRED"}>Non-Red</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
