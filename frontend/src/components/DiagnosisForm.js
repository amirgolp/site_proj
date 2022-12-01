import { useState } from "react"
import { useDiagnosisContext } from "../hooks/useDiagnosisContext"
import { useAuthContext } from '../hooks/useAuthContext'
import CustomizedHook from './AutoCompleteMUI'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

const DiagnosisForm = () => {
  const { dispatch } = useDiagnosisContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [age, setAge] = useState('')
  const [gen, setGen] = useState('male')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    if (!user) {
      setError('You must be logged in')
      return
    }

    const diagnosis = {
      title: data.get('title'),
      age: data.get('age'),
      gen: data.get('gen')
    }

    const response = await fetch('/api/diagnosis', {
      method: 'POST',
      body: JSON.stringify(diagnosis),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setAge('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_DIAGNOSIS', payload: json})
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="age"
          label="Age"
          type="number"
          id="age"
          autoComplete="age"
        />
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            name="gen"
            value={gen}
            onChange={e => setGen(e.target.value)}
            row
          >
            <FormControlLabel
              key="male"
              value="male"
              control={<Radio size="small" />}
              label="Male"
            />
            <FormControlLabel
              key="female"
              value="female"
              control={<Radio size="small" />}
              label="Female"
            />
          </RadioGroup>
          <FormLabel>List of Symptoms:</FormLabel>
          <CustomizedHook />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
        {error && <div style={{padding: '10px', background: '#ffefef', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: '4px', margin: '20px 0'}}>{error}</div>}
      </Box>

    </>
  )
}

export default DiagnosisForm