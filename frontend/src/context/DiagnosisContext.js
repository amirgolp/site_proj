import { createContext, useReducer } from 'react'

export const DiagnosisContext = createContext()

export const diagnosisReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SYMPTOMS':
      return {
        symptoms: action.payload
      }
    case 'SET_DIAGNOSIS': 
      return {
        diagnosis: action.payload
      }
    case 'CREATE_DIAGNOSIS':
      return {
        diagnosis: [action.payload, ...state.diagnosis]
      }
    case 'DELETE_DIAGNOSIS':
      return {
        diagnosis: state.diagnosis.filter((d) => d._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const DiagnosisContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diagnosisReducer, {
    diagnosis: null,
    symptoms: null
  })

  return (
    <DiagnosisContext.Provider value={{...state, dispatch}}>
      { children }
    </DiagnosisContext.Provider>
  )
}