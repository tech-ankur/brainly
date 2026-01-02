import React, { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { backendUrl } from "../config";
import { useNavigate } from "react-router";

const Signup = () => {
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

    await axios.post(`${backendUrl}/app/v1/signup`, {
      username,
      password,
    })

   
    navigate("/signin")
     alert("Signup successful!")

  } catch (error) {
    console.error("Signup failed:", error)
    alert("Signup failed")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={UserRef} placeholder="Username"  />
        <Input ref={PasswordRef} placeholder="Password" />

        <div className="flex  py-3 w-">
          <Button
            variant="primary"
            size="md"
            text="Sign Up"
            onClick={onClickhandler}
            fullwidth={true}
            loading={loading}
          />
        </div>
         <div className="flex">
          <div> Already have an account ?</div>
          <div className="ml-2 text-blue-500 hover:underline cursor-pointer" onClick={()=>{navigate("/")}}>sign in</div>
        </div>
      </div>
    </div>
  )
}

export default Signup
