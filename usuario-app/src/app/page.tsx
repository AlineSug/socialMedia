"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>(''); //hook
  const [error, setError] = useState<string>('');

  const authentication = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (login != "" && password != "" ) {
      const formData = {
        login: login,
        password: password
      }

      const add = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })

      const content = await add.json();
      if(content.token) {
        sessionStorage.setItem("token", content.token );
        router.push('/home');
      } else {
        setError(content.error);
      }

    }
  }


  return (
   <div>
    <div className="flex justify-center mb-4">
      <Image 
        src="/logonlogo.png" 
        alt="Logo" 
        width={220} 
        height={220}
        priority
      />
    </div>

      <form className='w-full' onSubmit={authentication}>
        <span className='font-bold text-white py-2 block text-2xl'>Login</span>
        <div className='w-full py-2'>
          <label htmlFor="" className='text-sm font-bold py-2 block'>Login:</label>
          <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <label htmlFor="" className='text-sm font-bold py-2 block'>Password</label>
          <input name='login' type="password" className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <button className="w-50 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-purple-900">Login</button>
        </div>
        <div>
          {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
        </div>
      </form>

    </div>
   
  );
}
