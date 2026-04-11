import { useState } from "react"

function TxtChng (){
    const[text,settext] = useState("Welcome")

    return(
        <>
        <h1>{text}</h1>
        <button  onClick={()=>{
            settext("welcome again")
        }}>Click</button>
        </>
    )
}
export default TxtChng