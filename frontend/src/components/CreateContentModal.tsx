import axios from "axios";
import CrossIcon from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { Backend_URL } from "../config";
import { useRef, useState } from "react";

enum ContentType{
  YOUTUBE="youtube",
  Twitter="twitter",
}
interface CreateContentModalProps {
  open: boolean
  onClose: () => void
}
const CreateContentModal = ({open,onClose}:CreateContentModalProps) => {
  const titleRef=useRef<HTMLInputElement>(null);
  const linkRef=useRef<HTMLInputElement>(null);
const [type,setType]=useState(ContentType.YOUTUBE)

 async  function addContent(){
  const title=titleRef.current?.value;
  const link=linkRef.current?.value;
await axios.post(`${Backend_URL}/app/v1/content`,{
    title,
    link,
    type
  },{
    headers:{
      "Authorization":localStorage.getItem("token")
    }
  })

onClose()
  }
  return (
    open && <div className="fixed inset-0 flex items-center justify-center">

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-500 opacity-60" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white p-4 rounded ">
        
        <div className="flex justify-end cursor-pointer" onClick={onClose}>
          <CrossIcon />
        </div>

        <div className="flex flex-col gap-3">
          <Input placeholder="Title" ref={titleRef} />
          <Input placeholder="Link" ref={linkRef} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="">Type</h1>
         <div className="flex gap-6 p-4  justify-center">
           <Button text="Youtube" variant={type===ContentType.YOUTUBE?"primary":"secondary"} size="md" onClick={()=>{setType(ContentType.YOUTUBE)}}/>
          <Button text="Twitter" variant={type===ContentType.Twitter?"primary":"secondary"} size="md" onClick={()=>{setType(ContentType.Twitter)}}/>
         </div>
        </div>
      <div className="flex justify-center">
        <Button onClick={addContent} variant="primary" text="submit" size="md"/>
      </div>
      </div>
    </div>
  );
};





export default CreateContentModal
