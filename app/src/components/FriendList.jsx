const FriendList = () => {
  return (
    <div className="flex w-2/12 bg-[#272829]">
        <div className="m-2 flex h-12 w-full bg-[#5B9A8B]">
            <img src="profile" width={40} height={40}/>
            <div className="flex flex-col">
                <h3>User Name</h3>
                <p>latest message</p>
            </div>
        </div>
    </div>
  )
}
export default FriendList