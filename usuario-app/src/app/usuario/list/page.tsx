"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Usuario {
    login: string;
    post: string;
}

export default function PostList() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetch('http://127.0.0.1:3000/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token") || ''
            },
        }).then(response => response.json()).then(data => setUsuarios(data))
    }, [usuarios]);

    return (
        <>
        <div className="bg-pink-90">
            <table className="box-content md:box-border">
                <thead>
                    <tr>
                        <td className='border border-slate-100'>Name</td>
                        <td className='border border-slate-300 text-center'>Post: </td>
                    </tr>
                </thead>

                <tbody className="usuarios" id="usuarios">
                    {usuarios.map((usuario) => (
                        <tr key={usuario.login}>
                            <td className='border border-slate-100 p-2 '>{usuario.login}</td>
                            <td className='border border-slate-100 p-2 text-center'>{usuario.post}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
            </div>
            <Link className="font-medium text-blue-600 dark:text-white hover:underline" href="/home">Back</Link>
        </div>
        </>
    )
    
}