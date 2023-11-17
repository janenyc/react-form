import { useState } from "react"
import './SignUpForm.css';


const SignUpForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (username.length < 8) {
            setValidationMessage('username must be eight characters in length');
            return;
        }

        try {
            const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const results = await response.json()

            setToken(results.token)
            setValidationMessage('');


        }
        catch (error) {
            setError(error.message)
        }

    }
    return (
        <>
            <h2 className="signup-form-heading">LOGIN</h2>
            {error && <p className="error-message">{error}</p>}
            {validationMessage && <p className="error-message">{validationMessage}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <label className="signup-label">
                    Username:
                    <input value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label className="signup-label">
                    Password:
                    <input value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button className="signup-button">Submit</button>
            </form>
        </>)
}

export default SignUpForm