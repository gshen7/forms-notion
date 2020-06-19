import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, 
  TextField, 
  Switch, 
  FormControl, 
  InputLabel, 
  Chip, 
  Select, 
  Input,
  Checkbox,
  ListItemText,
  MenuItem, 
  FormControlLabel, 
  LinearProgress} from "@material-ui/core";
import './styles.css';

export default function App() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  let {form_id} = useParams()
  const history = useHistory()

  const submit = (history) => {
    setSubmitting(true)
    setSubmitError("")
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questions)
    }
    fetch(`/api/submitToForm/${form_id}`, options).then((res) => {
      if (res.status === 200) {
        history.push('/submitted', { form_id: form_id })
      } else {
        setSubmitting(false)
        setSubmitError("Could not submit form, check that all mandatory fields are included")
      }
    })
  };

  const handleFieldInput = (value, index) => {
    let question = questions[index]
    question.value = value
    setQuestions([
      ...questions.slice(0,index),
      question,
      ...questions.slice(index+1)
    ])
    setSubmitError("")
  }

  useEffect(() => {
    fetch(`/api/getFormForDisplay/${form_id}`).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          setHeading(data.heading)
          setDescription(data.description)
          setQuestions(data.questions)
          setLoaded(true)
          document.title = data.heading ? data.heading : "Form"
        });
      } else {
        history.push('/no-form')
      }
    })
  }, [form_id, history]);

  let displayDescription = description ? (<p>{description}</p>) : ""

  return (
    <div className="Container">
      <h1>{heading ? heading : "Loading..."}</h1>
      {displayDescription}
      {questions.map( (question, index) => (
        <div className="UserInput" key={question.field}>
          {question.type === 'title' || question.type === 'text' ? <TextField
            fullWidth
            margin="normal"
            onChange={e => handleFieldInput(e.target.value, index)}
            value={question.value ? question.value : ""}
            label={(question.mandatory ? "* " : " ") + question.question}
            variant="outlined"
          /> : question.type === 'checkbox' ? <FormControlLabel 
            control={<Switch 
              value={question.value ? question.value : false}
              onChange={e => handleFieldInput(e.target.checked, index)}
              color="secondary"
            />}
            label={(question.mandatory ? "* " : " ") + question.question}
            labelPlacement="start"
            /> : question.type === 'select' ? <FormControl variant="outlined">
                <InputLabel id={question.field + "-select-label"}>{(question.mandatory ? "* " : " ") + question.question}</InputLabel>
                <Select
                  id={question.field + "-select"}
                  value={question.value ? question.value : ""}
                  onChange={e => handleFieldInput(e.target.value, index)}
                  // label={(question.mandatory ? "* " : " ") + question.question}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {question.options.map( (option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                  ))}
              </Select>
              </FormControl> : question.type === 'multi_select' ? <FormControl variant="outlined">
                <InputLabel id={question.field + "-multi-select-label"}>{(question.mandatory ? "* " : " ") + question.question}</InputLabel>
                <Select
                  multiple
                  id={question.field + "-multi-select"}
                  value={question.value ? question.value : ""}
                  onChange={e => handleFieldInput(e.target.value, index)}
                  input={<Input id={question.field + "-multi-select-chip"}/>}
                  renderValue={(selected) => (
                    <div className="chips">
                      {selected.map((value) => (
                        <Chip key={value} label={value} className="chip"/>
                      ))}
                    </div>
                  )}
                  // MenuProps={MenuProps}
                  // label={(question.mandatory ? "* " : " ") + question.question}
                >
                  {question.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={question.value ? question.value.indexOf(option) > -1 : false} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> : ""}
        </div>
      ))}
      <br/>
      <p>{submitError}</p>
      <div className="UserInput" >
        {loaded ? <Button
          variant="contained"
          color="default"
          onClick={() => submit(history)}
        >
          <h2>{submitting ? <div><LinearProgress /><p>Submitting...</p></div> : <div><LinearProgress variant="determinate" value={0} /><p>Submit</p></div>}</h2>
        </Button> : ""}
      </div>
    </div>
  );
}