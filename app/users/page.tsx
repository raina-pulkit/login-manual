import React from 'react'
import { getSession } from '../utils/lib'
import { redirect } from 'next/navigation';

const ProtectedPage = async () => {
  const session = await getSession();
  if(!session) redirect("/login");
  
  return (
    <div className="flex flex-col flex-1 w-full justify-center items-center">Hi, this is protected</div>
  )
}

export default ProtectedPage
