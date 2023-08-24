import {useEffect, useState} from "react";

const FriendList = () => {
  const [users, setUsers]= useState([]);

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const res = await fetch("http://localhost:3000/userslist", {
        method: "get",
      });
      if(res.status == 200){
        console.log("users list received succesfully");
        const resData = await res.json();
        setUsers(resData.users)
        console.log(users);

      }else{
        console.log("something wenth wrong")
      }
    }

    fetchUsers();
  }, [])

  useEffect(() => {
    console.log("Updated users:", users);
  }, [users]);

  return (
    <div className="flex flex-col w-2/12 bg-[#272829]">
      { users.map((user, index)=>(
        <div className="m-3 flex h-12 bg-[#6a706f]" key={index}>
            <img src={user.img} width={40} height={20} alt="profile"/>
              <div className="flex flex-col px-1" >
                <h3>{user.username}</h3>
                <p>latest message</p>
              </div>
        </div>
      ))}
    </div>
  )
}
export default FriendList