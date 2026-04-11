import { useState } from "react"

function Msg() {
    const [msg, setmsg] = useState(5)
    let message = ""
    if (msg > 0) {
        message = ("you have unread messages")

    }
    return (
        <>
        <h1>{message}</h1>
        </>
    )
}
export default Msg