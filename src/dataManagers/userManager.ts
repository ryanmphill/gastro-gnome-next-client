'use server'
import { currentUserType } from "@/types/userTypes";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiUrl:string = "http://localhost:8000";

export const followUser = async (id: number) => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    const res = await fetch(`${apiUrl}/users/${id}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${token?.value}`
    }
  })
  if (!res.ok) {
    throw new Error("Failed to follow user")
  }
  revalidateTag('follows')
  return await res.json()
  };

export const unFollowUser = async (id: number) => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    const res = await fetch(`${apiUrl}/users/${id}/unfollow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${token?.value}`
    }
  })
  if (!res.ok) {
    throw new Error("Failed to follow user")
  }
  revalidateTag('follows')
  return await res.json()
  };

  export const getCurrentUserFollows = async (): Promise<number[]> => {
    const cookieStore = cookies()
    const token = cookieStore.get('gastro_token')
    console.log("getCurrentUserFollows running...", "token=", token)
    if (token && token.value.length > 0) {
        const res = await fetch(`${apiUrl}/users/current`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Token ${token.value}`,
            },
            cache: 'force-cache',
            next: { tags: ['follows'] }
          })
          if (res.status !== 200) {
            return []
          }
          const userData: currentUserType = await res.json()
          return userData.following
    } else {
        return []
    }
};

export const getCurrentUserFavorites = async (): Promise<number[]> => {
  const cookieStore = cookies()
  const token = cookieStore.get('gastro_token')
  console.log("getCurrentUserFollows running...", "token=", token)
  if (token && token.value.length > 0) {
      const res = await fetch(`${apiUrl}/users/current`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token.value}`,
          },
          cache: 'force-cache',
          next: { tags: ['favorites'] }
        })
        if (res.status !== 200) {
          return []
        }
        const userData: currentUserType = await res.json()
        return userData.favorites
  } else {
      return []
  }
};

export const addRecipeToFavorites = async (id: number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('gastro_token')
  const res = await fetch(`${apiUrl}/recipes/${id}/add_favorite`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Token ${token?.value}`
  }
})
if (!res.ok) {
  throw new Error("Failed to delete recipe")
}
revalidateTag('favorites')
return await res.json()
};

export const removeRecipeFromFavorites = async (id: number) => {
  const cookieStore = cookies()
  const token = cookieStore.get('gastro_token')
  const res = await fetch(`${apiUrl}/recipes/${id}/remove_favorite`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Token ${token?.value}`
  }
})
if (!res.ok) {
  throw new Error("Failed to delete recipe")
}
revalidateTag('favorites')
return await res.json()
};