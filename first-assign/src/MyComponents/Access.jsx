import { useState } from "react";
function Access() {
    const [Accessn, setAccessn] = useState("");
    let adminid = "Alyan";
    let Admin2 = "Moderator";
    let message = ""
    if (Accessn === adminid || Accessn === Admin2) {
       if(Accessn === adminid){
          message=("access granted to Admin")
       }
       else{
         message=("access granted to moderator")
       }
    }

    return (
        <>
            <h1>Enter Access code</h1>
            <input type="text"
                placeholder="enter Access " value={Accessn} 
                onChange={(e) => setAccessn(e.target.value)} />
                <h1>{message}</h1>

        </>
    )
}
export default Access;