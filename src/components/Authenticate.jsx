import {useState} from "react"
import './Authenticate.css'

const Authenticate =({token}) =>{
 const[error, setError] = useState(null)  
 const[successMessage, setSuccesseMessage] = useState(null) 
 const [username, setUsername] = useState('');
const handleClick= async()=>{
    try{
const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/authenticate`,
{ 
    method: "GET", 
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    }
  })
  const result = await response.json()

  setSuccesseMessage(result.message)
  console.log(result.data.username)
    }
    catch(error){
        setError(error.message)
    }

}

    return (
    <>
<h2 className="authenticate-heading">Authenticate</h2>
        <button onClick={handleClick} className="authenticate-button">Authenticate Token</button>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
    </>)
}

export default Authenticate