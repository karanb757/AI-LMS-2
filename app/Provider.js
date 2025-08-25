"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import axios from 'axios';

function Provider({children}) {

    const {user} = useUser();

    //Runs only once when Starting
    useEffect(()=>{
        user&&checkIsNewUser();
    },[user])

    const checkIsNewUser = async ()=>{
        //check is user already exist
        // const result = await db.select().from(USER_TABLE)
        // .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

        // console.log(result)

        // if(result?.length==0){
        //     //if not : then add to DB
        //     const userResponse = await db.insert(USER_TABLE).values({
        //         name:user?.fullName,
        //         email:user?.primaryEmailAddress?.emailAddress
        //     }).returning({id:USER_TABLE.id})

        //     console.log(userResponse)
        // }

        const resp = await axios.post('/api/create-user',{user:user})
        console.log(resp.data);
    }
    
  return (
    <div>
        {children}
    </div>
  )
}

export default Provider