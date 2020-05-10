import React from 'react';
import axios from 'axios';

function Authenticate() {
    const submit = () => {
        axios.post("http://localhost:3000/api/v1/users/login", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data);
            } 
        })
        .catch(err => console.error(err));
    };

    return (
	<div>
		<h1> LOGIN </h1>
		<div className="frm">
        <form>
            <label>
                UserName:
                <input type="text" defaultValue="" id="username" />
            </label><br></br>
            <label>
                Password:
                <input type="text" defaultValue="" id="password" />
            </label><br></br>
            <input type="submit" value="Submit" onClick={submit} />
        </form>
		</div>
	</div>
    )
}

export default Authenticate;