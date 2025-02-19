

const Notifications = () => {
    
    useEffect(()=>{
        Echo.join('online')
        .here((users)=>{
            console.log(users)
        })
    })

    return (
        <div className="container mx-auto">
            hello noti
        </div>
    )
}

export default Notifications