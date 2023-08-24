import {useEffect,  useState } from "react";
import {io} from "socket.io-client";

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState({message: ""});
    const [resMessage, setResMessage] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);

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
            setSentMessages([...sentMessages, message.message]);
            console.log(socket.id);
          }
  }

  return (
    <div className="flex flex-col h-full w-full">
        <div className="flex justify-between bg-[#28604c] h-10 items-center px-4">
            <img alt="user"/>
            <h3>username</h3>
            <button>setting</button>
        </div>
        <div className=" bg-[#2C3333] h-full text-slate-100 overflow-hidden">
            <div className="px-4 py-2 flex-grow">
                {resMessage.map((reply, index) => (
                    <p key={index}>{reply}</p>
                ))}
            </div>
            <div className="px-4 py-2 flex-grow flex flex-col justify-end">
                {sentMessages.map((msgSend, index) => (
                    <p key={index}>{msgSend}</p>
                ))}
            </div>
        </div>
        <form onSubmit={handleSendMessage} className=" p-2 flex flex-row bg-[#2C3333]">
            <textarea onChange={handleChange} name="message" value={message.message} className="w-full"/>
            <button type="submit" className="bg-[#309088] w-1/12 ml-2 hover:bg-[#406f6b] active:bg-[#194440]">send</button>
        </form>
        
    </div>
  )
}
export default ChatBox