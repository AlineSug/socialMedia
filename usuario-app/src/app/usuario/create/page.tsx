"use client"
import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserCreate() {

    const router = useRouter();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword ] = useState<string>('');
    const [post, setPost] = useState<string>('');
    const [error, setError] = useState<string>('');

    const addUsuario = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setError('');
        if(login != "" && password != "" && post != ""){
            const formData = {
                login: login,
                password: password,
                post: post
            }

            const add = await fetch('http://127.0.0.1:3000/postUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });
            const content = await add.json();

            if (content.login) {
                router.push('/home');
            }else {
                setError(content.error);
            }
        }
    };


    return (
        <>
            <form className='w-full m-4' onSubmit={addUsuario}>
                <span className='font-bold text-white py-2 block text-2xl'>Login Registration</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Login: </label>
                    <input type='text' name='name' className='w-full border-[1px] border-white p-2 rounded-sm' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Password: </label>
                    <textarea name='login' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPassword(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Your Status: </label>
                    <textarea name='password' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPost(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-250 border-[1px] rounded-sm bg-blue-300">Submit</button>
                </div>
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
    
                </div>

                <Link className='font-bold text-blue-300'href="/home">Back</Link>
            </form>
        

        </>
    )
}