import {useEffect,  useState } from "react";
import {io} from "socket.io-client";

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState({message: ""});
    // const [resMessage, setResMessage] = useState({resMessage: ""})

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        
    
        return () => {
          newSocket.disconnect();
          
        };
      }, []);

   


    const handleChange = (e)=>{
        setMessage({...message, [e.target.name]: e.target.value})
    }
    const handleSendMessage = (e)=>{
        e.preventDefault();
        if (socket) {
            socket.emit("sendMessage", message.message);
            setMessage({ ...message, message: "" });
            console.log(socket.id);
          }
  }

  return (
    <div>
        <div>
            <img/>
            <h3>username</h3>
        </div>
        {/* <div>
            {
                resMessage.map((reply, index)=>{
                    <p id={index}>{reply}</p>
                })
            }
        </div> */}
        <form onSubmit={handleSendMessage}>
            <textarea onChange={handleChange} name="message" value={message.message}/>
            <button type="submit">send</button>
        </form>
    </div>
  )
}
export default ChatBox