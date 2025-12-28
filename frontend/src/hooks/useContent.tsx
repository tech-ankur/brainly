import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_URL } from "../config";
export function useContent() {
    const[content,setContent]=useState([])

    function fetchContent(){
       
const response =axios.get(`${Backend_URL}/app/v1/content`,{
    headers:{
      "Authorization":localStorage.getItem("token")
    }
  })
.then((response)=>{
setContent(response.data.content)
})

    }
 useEffect(()=>{
fetchContent()


},[])
return {content,fetchContent}
}