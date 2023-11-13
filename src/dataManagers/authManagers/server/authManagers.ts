'use server'

import { loginUser } from "@/dataManagers/authManagers/client/authManager"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

const apiUrl:string = "http://localhost:8000";

export const loginAction = async (formData: FormData) => {

    const user = {
        username: `${formData.get("username")}` ?? "",
        password: `${formData.get("password")}` ?? ""
    }
    const res = await loginUser(user)
    if (res.valid === true) {
        cookies().set('gastro_token', res.token, { secure: true })
        const cookieStore = cookies()
        console.log("All cookies", cookieStore.getAll())
        redirect('/')
    } else {
        console.log("Invalid username or password")
    }
}

export const logoutAction = () => {
    console.log("logout action running")
    cookies().delete('gastro_token')
    const cookieStore = cookies()
    console.log(cookieStore.getAll())
    redirect('/')
}

export const getCurrentUserId = async (): Promise<number> => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    console.log("getCurrentUserId running...", "token=", token)
    if (token && token.value.length > 0) {
        const res = await fetch(`${apiUrl}/users/current`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Token ${token.value}`,
            },
            cache: 'no-store'
          })
          if (res.status !== 200) {
            return 0
          }
          const userData = await res.json()
          return userData.id
    } else {
        return 0
    }
};