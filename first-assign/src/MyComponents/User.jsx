import { useState } from "react";
function User() {
    const [usern, setusern] = useState("");
    let adminid = "Alyan";
    let isadmin = true;
    let message =""
    if (usern === adminid && isadmin === true) {
        message=("Welcome admin")
    }

    return (
        <>
            <h1>Enter Username</h1>
            <input type="text"
                placeholder="enter User " value={usern} 
                onChange={(e) => setusern(e.target.value)} />
                <h1>{message}</h1>

        </>
    )
}
export default User;