function List() {
    const Listcontainer = [
        { id: 1, name: "phirdge", price: "25000" ,color:"grey"},
        { id: 2, name: "pakhho", price: "10000",color:"black" },
        { id: 3, name: "winjhnow", price: "300",color:"white" },
    ]

    return (
        <>
         < h1>Product List</h1 >
    {
        Listcontainer.map((list) => (
            <div key={list.id} className="productCard">
                <h2 className="title">{list.name}</h2>
                <p>Price: {list.price}</p>
                <p>Color: {list.color}</p>
            </div>
        ))
    }

        </>
    )
}
export default List;