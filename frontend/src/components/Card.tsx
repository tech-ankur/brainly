import ShareIcon from "../icons/ShareIcon"
interface CardProps {
    title: string;
    link:string;
    type:"twitter"|"youtube"|"other"
}

 const Card = (props:CardProps) => {
    
  return (
   
     <div className="m-2 pt-2 px-3 bg-white rounded-md border border-gray-200 shadow-sm
     max-w-80 min-h-96">

 {/* header */}
        <div className="flex justify-between text-md">
            <div className="flex gap-2 items-center ">
           <div className="text-gray-500"> <ShareIcon size="md"/></div>
            <div> {props.title}    </div>
          
            </div>
            <div  className="flex gap-2 items-center ">
          <div className="text-gray-500">
            <a href ={props.link} target="_blank" >  <ShareIcon size="md"/></a>
            </div>
            <div className="text-gray-500"> <ShareIcon size="md"/></div>
            </div>
        </div> 
   {/* body */}
   <div className="pt-4">
    {props.type==="youtube" && <iframe className="w-full" width="560" height="315" src={props.link.replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
    {props.type==="twitter" && 
<blockquote className="twitter-tweet">
  <a href={props.link.replace("x.com", "twitter.com")}></a> 
</blockquote>}

{props.type==="other" && <div className="text-gray-500"> No preview available </div>}
   
 



   </div>



  
   </div>
  )
}

export default Card
