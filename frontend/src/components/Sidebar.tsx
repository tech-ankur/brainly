import Logo from "../icons/Logo"
import Twitter from "../icons/Twitter"
import Youtube from "../icons/Youtube"
import Sidebaritems from "./Sidebaritems"


const Sidebar = () => {
  return (
    <div className='h-screen bg-white border-r w-80 fixed left-0 top-0 pl-4'>
        <div className="flex text-2xl items-center gap-2 font-bold pt-4 ">
            <div className="text-purple-600" ><Logo/></div>
          <div>
              Brainly
          </div>

        </div>
            <div className='pt-4 '>
        <Sidebaritems text="Twitter" icon={<Twitter/>}/>
        <Sidebaritems text="Youtube" icon={<Youtube/>}/>
            </div>
    </div>
  )
}

export default Sidebar
