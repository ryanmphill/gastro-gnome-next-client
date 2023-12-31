'use server'

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

const apiUrl:string = "http://localhost:8000";

const loginUser = async (user: { username: string, password: string }) => {
    const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        cache: "no-store",
        body: JSON.stringify(user)
    })
    return await res.json()
};

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

type newUserType = {
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string
  };

const registerUser = async (newUser: newUserType) => {
    const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        cache: "no-store",
        body: JSON.stringify(newUser)
    })
    return await res.json()
};

export const registerAction = async (formData: FormData) => {

    const user = {
        username: `${formData.get("username")}` ?? "",
        password: `${formData.get("password")}` ?? "",
        email: `${formData.get("email")}` ?? "",
        first_name: `${formData.get("first_name")}` ?? "",
        last_name: `${formData.get("last_name")}` ?? ""
    }
    
    const res = await registerUser(user)
    if (res.token) {
        cookies().set('gastro_token', res.token, { secure: true })
        const cookieStore = cookies()
        console.log("All cookies", cookieStore.getAll())
        redirect('/')
    } else if (res.message && res.message.includes("Username already taken")) {
        window.alert(res.message)
    } else {
        console.log("Invalid user credentials")
    }
}

export const logoutAction = () => {
    console.log("logout action running")
    cookies().delete('gastro_token')
    const cookieStore = cookies()
    console.log(cookieStore.getAll())
    // Revalidate data to remove authenticated privileges
    revalidateTag("currentUserId")
    revalidateTag("authorizedToEdit")
    revalidatePath('/new-recipe', 'page')
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
            next: { tags: ['currentUserId'] }
            // cache: 'no-store'
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

/**Makes a fetch call to the API to verify that a user is authorized to edit a given recipe. 
 * 
 * Returns `true` if user is authorized to edit recipe, either as the author of that recipe or as a
 * user with admin privileges.
 * 
 * Else, if user info is valid but not authorized to edit, returns `false` 
 * 
 * If no authenticated user credentials provided, redirects to login page*/
export const authorizedToEditRecipe = async (recipeId: number): Promise<boolean | never> => {
    const token = cookies().get('gastro_token')
    if (token && token.value.length > 0) {
        const res = await fetch(`${apiUrl}/recipes/${recipeId}/authorized_to_edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token.value}`
            },
            next: { tags: ['authorizedToEdit'] },
            cache: "no-store"
        })
        console.log(res.status, res.statusText)
        if (!res.ok) {
            return false
        }
        type editAuth = {
            "isAuthor": boolean,
            "isAdmin": boolean
        }
        const data: editAuth = await res.json()
        return data.isAuthor || data.isAdmin
    } else {
        redirect('/login')
    }
}