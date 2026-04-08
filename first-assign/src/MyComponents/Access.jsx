import { useState } from "react";
function Access() {
    const [Accessn, setAccessn] = useState("");
    let adminid = "Alyan";
    let Admin2 = "Moderator";
    if (Accessn === adminid || Accessn === Admin2) {
       if(Accessn === adminid){
         alert("welcome admin");
       }
       else{
         alert("welcome moderator");
       }
    }

    return (
        <>
            <h1>Enter Access code</h1>
            <input type="text"
                placeholder="enter Access " value={Accessn} 
                onChange={(e) => setAccessn(e.target.value)} />

        </>
    )
}
export default Access;