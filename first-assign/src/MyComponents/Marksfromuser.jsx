import { useState } from "react";
function Marksfromuser() {
    const [marks, setmarks] = useState("");
    return (
        <>
            <h1>Enter your MArks</h1>
            <input type="number"
                placeholder="enter marks "
                value={marks}
                onChange={(e) => setmarks(e.target.value)} />

            <h1 >{marks} </h1>
        </>
    )
} 
export default Marksfromuser;