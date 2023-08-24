

const Navbar = () => {
  return (
    <div className=" flex justify-between bg-[#5B9A8B] px-4 h-12 items-center">
        <header className="flex justify-between text-2xl">
            <img alt="logo"/>
            <h3>Chat</h3>
        </header>
        
        <div>
            <button>Profile</button>
        </div>
    </div>
  )
}
export default Navbar