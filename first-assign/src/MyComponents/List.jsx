function List() {
    const Listcontainer = [
        { id: 1, name: "car", price: "25000" ,color:"grey"},
        { id: 2, name: "car2", price: "10000",color:"black" },
        { id: 3, name: "car3", price: "300",color:"white" },
    ]
        
    return (
        <>
         < h1>Product List</h1 >
    {
        Listcontainer.map((list) => (
            <div key={list.id} className="productCard">
                <h2 className="title">{list.name}</h2>
                <h4 className="white">Price: {list.price}</h4>
                <h4 className="white">Color: {list.color}</h4>
            </div>
        ))
    }

        </>
    )
}
export default List;