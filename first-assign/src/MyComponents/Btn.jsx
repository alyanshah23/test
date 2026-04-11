import { useState } from "react";
function Btn() {
    const [count, setcount] = useState(0)

    return (
        <>
            <h1>Counter</h1>
            <button onClick={
                () => {
                    setcount(count + 1)
                }}> click</button>



            <button onClick={
                () => {
                    if (count > 0) {
                        setcount(count - 1)
                    }
                }
            }> click to decrease</button>

            <button onClick={
                () => {
                    setcount(0)

                }
            }> click to reset</button>


            <h1 >{count}</h1>



        </>
    )
}
export default Btn;