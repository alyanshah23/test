function Employee() {
    const EmployeeList = []
    let message = ""
    if (EmployeeList.length === 0) {
        message = "No Employees found"
    }
    return (
        <>
          <h3>{message}</h3>

        </>
    )
}
export default Employee