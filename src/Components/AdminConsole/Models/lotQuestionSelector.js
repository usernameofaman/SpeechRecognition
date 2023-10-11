import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

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



    const defaultValue = questions.find((option) => option.code === data);


    const handleOnChange = (event, value) => {
        try{
            let state = { ...modalDataLots };
        let answers = state.questions;
         
        let index = answers.indexOf(data);
        answers[index] = value.code
        state.questions = answers;
        setModalDataLots(state);
        }
        catch{
             
        }
    };

    return (
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
            isOptionEqualToValue={(option, value) => option.code === value.code}
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
    );
}
