import { useState } from "react"

function Realtimettxt() {
    const [ text, settext ] = useState("")
    return (
        <>
           <input type="text" placeholder="Enter your feelings" value={text}
           onChange={(e)=>{settext(e.target.value)}}/>
           <h1>{text}</h1>
     
        </>
    )
}
export default Realtimettxt