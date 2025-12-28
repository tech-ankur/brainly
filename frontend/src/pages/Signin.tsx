import React, { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { Backend_URL } from "../config";
import { useNavigate } from "react-router";

const Signin = () => {
  
    const UserRef=useRef<HTMLInputElement>(null);
    const PasswordRef=useRef<HTMLInputElement>(null);
const navigate=useNavigate();
  const [loading, setLoading] = React.useState(false)

  async function onClickhandler(
  event: React.MouseEvent<HTMLButtonElement>
) {
  event.preventDefault()
  setLoading(true)

  try {
    const username = UserRef.current?.value
    const password = PasswordRef.current?.value

    const {data}=await axios.post(`${Backend_URL}/app/v1/signin`, {
      username,
      password,
    })

    localStorage.setItem("token", data.token);
    navigate("/dashboard")
     

  } catch (error) {
    console.error("Signin failed:", error)
    alert("Signin failed")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={UserRef} placeholder="Username" />
        <Input ref={PasswordRef} placeholder="Password" />

        <div className="py-3">
          <Button
            variant="primary"
            size="md"
            text="Sign in"
            onClick={onClickhandler}
            fullwidth={true}
            loading={loading}
          />
        </div>
        <div className="flex">
          <div> Don't have an account ?</div>
          <div className="ml-2 text-blue-500 hover:underline cursor-pointer" onClick={()=>{navigate("/signup")}}>sign up</div>
        </div>
      </div>
    </div>
  )
}

export default Signin
