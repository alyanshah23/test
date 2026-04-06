import { useState } from "react";
function User() {
    const [usern, setusern] = useState("");
    let adminid = "Alyan";
    let isadmin = true;
    if (usern === adminid && isadmin === true) {
        alert("welcome admin");
    }

    return (
        <>
            <h1>Enter Username</h1>
            <input type="text"
                placeholder="enter User " value={usern} 
                onChange={(e) => setusern(e.target.value)} />

        </>
    )
}
export default User;