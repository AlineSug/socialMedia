import React from "react";
import Link from "next/link";

export default function Home() {
    
    return (
        <>
        
        
        <div>
            <Link className='font-bold text-white font-large' href="/usuario/create">Create a new User</Link>
            <br></br>
            <Link className='font-bold text-white-200 font-large' href="/usuario/list">Check your Feed</Link>
        </div>
        </>
    )
}