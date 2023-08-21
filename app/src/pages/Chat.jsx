import { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import FriendList from "../components/friendList";


const Chat = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const Token = localStorage.getItem("jwtToken");
    if(!Token){
      navigate("/login");
      return
    }
    const verifyChat = async()=>{
      const res = await fetch("http://localhost:3000/verifyChat", {
        method: "post",
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      if(res.status == 200){
        console.log("Verified Authentication")
      } else{
        console.error("Authentication failed");
        navigate("/login");
        return
      }
    }
    verifyChat();
  }, []);
  

  return (
    <div className=" flex flex-col h-screen w-screen">
      <div>
        <Navbar />
      </div>
        <div className=" flex w-screen h-full">
          <FriendList />
          <ChatBox />  
        </div>
    </div>
  )
}
export default Chat