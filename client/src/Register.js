import React from 'react';
import axios from 'axios';

function Register() {
    const submit = () => {
        axios.post("http://localhost:3000/api/v1/users/register", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
			email: document.getElementById("email").value
        })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data);
            } 
        })
        .catch(err => console.error(err));
    };

    return (
		<div className="frm">
			<h1> REGISTER </h1>
			<form>
				<label>
					UserName:
					<input type="text" defaultValue="" id="username" />
				</label><br></br>
				<label>
					Password:
					<input type="text" defaultValue="" id="password" />
				</label><br></br>
				<label>
					Email:
					<input type="text" defaultValue="" id="email" />
				</label><br></br>
				<input type="submit" value="Register" onClick={submit} />
			</form>
		</div>

    )
}

export default Register;