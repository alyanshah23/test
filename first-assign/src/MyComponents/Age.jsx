import { useState } from "react";
function Age() {
    const [num, setnum] = useState("");
    let result = "";
    if (num >= 18){
        result = "eligible ";
    }
    else if(num  ==="" ){
        result = "";
    }
    else{
        result = "not eligible";
    }
   
    return (
        <>
            <h1>Enter age</h1>
            <input type="number"
                placeholder="enter age "
                value={num}
                onChange={(e) => setnum(e.target.value)} />

            <h1 >{result} </h1>
        </>
    )
}
export default Age;