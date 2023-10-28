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
  setModalDataDisorder,
  modalDataDisorder, //ModalDisorder which Contains all the Data 
  data, // ye pata nahi kaha se arha hai! 
  possibleAnswers, // Isme getDisorder ka API Data arha h socha tha mapping mai use krke dekhunga.
  disabled,
  name,
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
      await sleep(1); // For demo purposes.

      if (active) {
        console.log("IS this Good PLace ", possibleAnswers)
        const uniqueAnswers = getUniqueAnswerCodes(possibleAnswers);
        setOptions([...uniqueAnswers]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, possibleAnswers]);

  function getUniqueAnswerCodes(answers) {
    const seenCodes = new Set();
    const uniqueAnswers = [];
  
    for (const answer of answers) {
      const code = answer.possibleAnswerCode;
  
      if (!seenCodes.has(code)) {
        // Code is not seen before, add to the new array
        uniqueAnswers.push(answer);
        seenCodes.add(code);
      }
    }
  
    return uniqueAnswers;
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const defaultValue = possibleAnswers.find((option) => {

    return option.possibleAnswerCode === data
  }); // yaha pe red question ko data se compare karrha shayd jo data arha uske sath 

  ; // value is "201"

  const handleOnChange = (event, value) => {
    try {
      let state = { ...modalDataDisorder };
      let questions = state[`${name}Questions`];
      let index = questions.indexOf(data);
      questions[index] = value.possibleAnswerCode;
      state[`${name}Questions`] = questions;
      setModalDataDisorder(state);
    }
    catch {
      ;
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
      getOptionLabel={(option) => `${option.possibleAnswerCode} ${option.possibleAnswerText} ${option.questionText}`} // Display both redQuestions and name
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
            style : { color: name === "yellow" ? "#d8d814" : name === "voilet" ? "violet" : name },
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
