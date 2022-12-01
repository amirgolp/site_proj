import { useDiagnosisContext } from '../hooks/useDiagnosisContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DiagnosisDetails = ({ diagnosis }) => {
  const { dispatch } = useDiagnosisContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/diagnosis/' + diagnosis._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_DIAGNOSIS', payload: json})
    }
  }

  return (
    <div className="diagnosis-details">
      <h4>{diagnosis.title}</h4>
      <p><strong>Gender: </strong>{diagnosis.gen}</p>
      <p><strong>Age: </strong>{diagnosis.age}</p>
      <p>{formatDistanceToNow(new Date(diagnosis.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default DiagnosisDetails