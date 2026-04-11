import { useState } from "react"

function Loginpage() {
    const [isloggedin, setisloggedin] = useState(false)
    let opt1 = isloggedin ? "show" : "hide";
    let opt2 = isloggedin ? "hide" : "show";


    return (
        <>

            <div className={opt1}>
                <h1>welcome </h1>
                <button>Logout</button>
            </div>



            <div className={opt2}>
                <h1> login Now </h1><br /><br /><br /><br />
                <input type="text" placeholder="Enter username" /> <br />
                <input type="password" placeholder="Enter password" /><br />
                <button>Login</button>
            </div>


        </>
    )
}
export default Loginpage