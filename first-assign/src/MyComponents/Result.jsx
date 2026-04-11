import { useState } from "react";
function Result() {
    const [Result, setResult] = useState( " ");
    let result=  (Result >= 50) ? "pass" : "fail";
    return (
        <>
            <h1>Enter Result </h1>
            <input type="Number"
                placeholder="enter Result " value={Result}
                onChange={


                    (e) => setResult(e.target.value)

                }


            />
            <h1>{result}</h1>
        </>
    )
}
export default Result;