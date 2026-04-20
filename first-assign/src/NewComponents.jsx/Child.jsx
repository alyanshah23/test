function Child(props) {
    return (
        <div>
            <h1 >Child Component</h1>
            <h2>Name: {props.name}</h2>
            <h2>Second Name: {props.secondName}</h2>
        </div>
    );
}   
export default Child;