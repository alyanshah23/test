fucntion Products(){
    const ProductsList=[
        {id:1,Productname:"P1",ProductPrice:1000 },
        {id:2,Productname:"P2",ProductPrice:2000 },
        {id:3,Productname:"P3",ProductPrice:3000 },
        {id:4,Productname:"P4",ProductPrice:4000 },
        {id:5,Productname:"P5",ProductPrice:5000 }
    ]
    return(
        <>
        <h1> Products </h1> 
        {ProductsList.map((p)=>{
            <div key={p.id}>

            </div>
        })}

        </>
    )
}
export default Products