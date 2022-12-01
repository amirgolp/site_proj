import { useAuthContext } from './useAuthContext'
import { useDiagnosisContext } from './useDiagnosisContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchDiagnosis } = useDiagnosisContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchDiagnosis({ type: 'SET_DIAGNOSIS', payload: null })
  }

  return { logout }
}