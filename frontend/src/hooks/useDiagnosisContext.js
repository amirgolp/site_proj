import { DiagnosisContext } from '../context/DiagnosisContext'
import { useContext } from 'react'

export const useDiagnosisContext = () => {
  const context = useContext(DiagnosisContext)

  if (!context) {
    throw Error('useDiagnosisContext must be used inside an DiagnosisContextProvider')
  }

  return context
}