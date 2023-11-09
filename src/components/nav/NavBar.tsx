'use server'
import { getCurrentUserId } from "@/dataManagers/authManagers/server/authManagers"
import { NavBarContent } from "./NavBarContent"

export const NavBar = async () => {
    const currentUserId = await getCurrentUserId()
    return (
        <NavBarContent currentUserId={currentUserId} />
    )
}