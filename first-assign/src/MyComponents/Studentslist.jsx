function StudentsList() {
    const StudentsData = [
        {
            id: 1,
            name: "Ali",
            class: "8",
            age: 15
        },
        {
            id: 2,
            name: "bilal",
            class: "8",
            age: 15
        },
        {
            id: 3,
            name: "farooq",
            class: "8",
            age: 15
        }, {
            id: 4,
            name: "hussain",
            class: "8",
            age: 15
        }
    ]
    return (
        <>
    <h1>Students Data</h1>
  

    {StudentsData.map((n)=>(
    <div key={n.id}>
       <h3>  name: {n.name}</h3>
       <h3>  class: {n.class}</h3>
       <h3>  age: {n.age}</h3>
       </div>
    ))}
        </>
    )
}
export default StudentsList