import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [id,setId] = useState("");
    const [passkey,setPasskey] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(id.trim() === "" || passkey.trim() === ""){
          setError("Please insert valid credentials");
          return;
        } 
        try {
            const res = await axios.post("http://localhost:5000/api/staff/login",{},
            {
                headers: {
                "x-api-key": passkey,
                "id": id, 
                },
            }
        );
        if(res.status == 200){
          localStorage.setItem("PASSKEY",passkey);
          navigate("/home");
        }
        console.log("Login response:", res.data);
        } catch(err){
          setError(err.response.data.message);
        }
    };

  return (
    <div className="w-full flex flex-col px-20 items-center py-40 gap-6">
      <h3 className="text-3xl font-semibold text-blue-800 text-center">
        Enter your details to confirm your identity
      </h3>

      <div className="flex flex-col gap-5 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <label htmlFor="id" className="text-xl font-medium text-gray-700">
            ID
          </label>
          <input
            type="text"
            id="id"
            placeholder="Enter your staff ID"
            className="h-[40px] bg-gray-200 rounded-md px-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passkey" className="text-xl font-medium text-gray-700">
            Passkey
          </label>
          <input
            type="password"
            id="passkey"
            placeholder="Enter your secure passkey"
            className="h-[40px] bg-gray-200 rounded-md px-3 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPasskey(e.target.value)}
            value={passkey}
          />
        </div>
      </div>

    {error && (<h2 className='text-xl text-red-500' >{error}</h2>)}

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        onClick={handleSubmit}
      >
        Submit Credentials
      </button>
    </div>
  );
}

export default Login;
