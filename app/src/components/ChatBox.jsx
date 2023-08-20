import {useEffect,  useState } from "react";
import {io} from "socket.io-client";

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState({message: ""});
    const [resMessage, setResMessage] = useState([])

//making socket reactivity using use effect
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.on("receiveMessage", (message)=>{
            setResMessage((prevMessages)=>[...prevMessages, message]);
        })
    
        return () => {
          newSocket.disconnect();
        };
      }, []);

//handle Change    
    const handleChange = (e)=>{
        setMessage({...message, [e.target.name]: e.target.value})
    }

//handle sending Messages
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
            <img alt="user"/>
            <h3>username</h3>
        </div>
        <div>
            {resMessage.map((reply, index) => (
                <p key={index}>{reply}</p>
            ))}
        </div>
        <form onSubmit={handleSendMessage}>
            <textarea onChange={handleChange} name="message" value={message.message}/>
            <button type="submit">send</button>
        </form>
    </div>
  )
}
export default ChatBox