function List() {
    const Listcontainer = [
        { id: 1, name: "car", price: 25000 ,color:"grey"},
        { id: 2, name: "car2", price: 10000,color:"black" },
        { id: 3, name: "car3", price: 300,color:"white" },
    ]

    return (
        <>
         < h1>Product List</h1 >
    {
        Listcontainer.map((n) => (
            <div key={n.id} >
                <h2 >{n.name}</h2>
                <h4 >Price: {n.price}</h4>
                <h4 >Color: {n.color}</h4>
            </div>
        ))
    }

        </>
    )
}
export default List;
