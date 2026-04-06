import { useState } from "react";
function Evod() {
    const [num, setnum] = useState("");
    let result = "";
    if (num % 2 === 0){
        result = "Even";
    }
     else if(num  ==="" && num === "0" && num === 0){
        result = "";
    }
    else(
        result = "Odd"
    )
   
    return (
        <>
            <h1>Enter number</h1>
            <input type="number"
                placeholder="enter marks "
                value={num}
                onChange={(e) => setnum(e.target.value)} />

            <h1 >{result} </h1>
        </>
    )
}
export default Evod;