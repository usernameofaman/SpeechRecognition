import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function Asynchronous({
  setModalDisorder, 
  modalDataDisorder, //ModalDisorder which Contains all the Data 
  data, // ye pata nahi kaha se arha hai! 
  questions, // Isme getDisorder ka API Data arha h socha tha mapping mai use krke dekhunga.
  disabled,
  onChange,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  
  React.useEffect(() => {
    let active = true;
    
    if (!loading) {
      return undefined;
    }
    
    (async () => {
      await sleep(1e3); // For demo purposes.
      
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
  
  const defaultValue = questions.find((option) => option.redQuestions === data); // yaha pe red question ko data se compare karrha shayd jo data arha uske sath 

  console.log(data ,"=" , modalDataDisorder.redQuestions); // value is "201"
  
  const handleOnChange = (event, value) => {
    try {
      let state = { ...modalDataDisorder };
      let answers = state.questions;
      let index = answers.indexOf(data);
      answers[index] = value.redQuestions;
      state.questions = answers;
      setModalDisorder(state);
    } catch {
      console.log("invalid value");
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
      isOptionEqualToValue={(option, value) => option.redQuestions === data}
      getOptionLabel={(option) => `${option.redQuestions} ${option.name}`} // Display both redQuestions and name
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
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
