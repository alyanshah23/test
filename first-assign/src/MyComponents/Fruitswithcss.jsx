import "./Fruits.css"
function Fruitswithcss(){
    const FruitsData=[
        {
            id:1,Name:"Mango",Price:1000
        },{
            id:2,Name:"Kiwi",Price:2400
        },{
            id:3,Name:"Orange",Price:1600
        },{
            id:4,Name:"Guava",Price:1300
        },{
            id:5,Name:"Lychee",Price:2000
        },{
            id:6,Name:"Apple",Price:3000
        }
    ]
    return(
        <>
        <h1 className="heading">Fruits LIst</h1>
       <div className="set">
         {FruitsData.map((n)=>(
            <div className="card" key={n.id}>
                <h3 className="cardheading">Name :{n.Name}</h3 >
                <p>Price :{n.Price}</p>

            </div>
             ))}
       </div>
       
        
        
        </>
    )
}
export default Fruitswithcss