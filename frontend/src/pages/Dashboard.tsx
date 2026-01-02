import  { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import PlusIcon from '../icons/PlusIcon'
import ShareIcon from '../icons/ShareIcon'
import Card from '../components/Card'
import CreateContentModal from '../components/CreateContentModal'
import Sidebar from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { backendUrl } from '../config'
import { useNavigate } from 'react-router'

const Dashboard = () => {
    const [openModal, setOpenModal] =  useState(false);
    const [islogin,setIslogin]=useState(false);
    const navigate=useNavigate();
 const {content,fetchContent}=useContent();
 useEffect(()=>{
  fetchContent()
 },[openModal,islogin])

    function onClosehandler(){
  setOpenModal(false);
 }
  return (
    <div>
      <Sidebar/>

    <div className='p-4 ml-80 min-h-screen bg-slate-100'>
      <CreateContentModal open={openModal} onClose={onClosehandler}/>
      <div className='flex justify-end gap-4 mb-4'>
    <Button  variant="primary" size="md" text="Share Brain"  startIcon={<ShareIcon size="md"/>} 
    onClick={async ()=>{
     const response= await axios.post(`${backendUrl}/app/v1/brain/share`,{
        share:true
      },{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      })
      console.log(response)
      const url=`http://localhost:5173/share/${response.data.message}`;
      alert(url)
    }} />
       <Button  variant="secondary" size="md" text="Add content" onClick={()=>{
        setOpenModal(true);
        setIslogin(true)
        }
        } startIcon={<PlusIcon size="md"/>} />
     {islogin && <Button  variant="secondary" size="md" text="Signin" onClick={()=>{navigate("/")}} />}
         
   </div>
   <div className='flex flex-wrap gap-4'>
        {content.map(({ _id,type,link,title})=>
<Card key={_id} type={type} link={link} title={title}/>
        )}
    </div>
    </div>
    </div>
  )
}

export default Dashboard
