import { useState} from "react";


const Chat = () => {

  const [message, setMessage] = useState({message: ""});

  const handleChange = (e)=>{
    setMessage({...message, [e.target.name]: e.target.value})
  }
  const handleSendMessage = ()=>{
  
  
  }

  return (
    <div>
      <div>
        <h3>username</h3>
      </div>
      <div>
        
      </div>
      <form onSubmit={handleSendMessage}>
        <textarea onChange={handleChange} name="message" value={message.message}/>
        <button type="submit">send</button>
      </form>
    </div>
  )
}
export default Chat