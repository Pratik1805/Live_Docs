import React from 'react'
import CollaborativeRoom from "@/components/CollaborativeRoom";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getDocument} from "@/lib/actions/room.actions";



const Document = async ({ params: {id} }: SearchParamProps) => {

    const clerkUser = await currentUser();

    if(!clerkUser) redirect('/sign-in');

    const room = await getDocument({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress,
    })

    if(!room) redirect('/');

    //TODO: Assess the permissions of the user to access documents
    return (
        <main className={"w-full flex flex-col items-center"}>
            <CollaborativeRoom
                roomId = {id}
                roomMetadata = {room.metadata}
            />
        </main>
    )
}
export default Document
