function FarmerProduct(){
    useEffect(()=>{
        fetch("/farmerproducts", { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            } })
        .then(r=>r.json())
        .then(data=>(
            console.log(data)
        ))
    })
    return(
        <>
        </>
    )
}




export default FarmerProduct