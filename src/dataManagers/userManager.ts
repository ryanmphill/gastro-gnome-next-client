'use server'
import { currentUserType } from "@/types/userTypes";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

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
  revalidateTag('currentUserFollows')
  // Main feed data revalidation
  revalidateTag('recipes')
  // Profile feed data revalidation
  revalidateTag('profileFollowing')
  revalidateTag('profileFollowers')

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
  revalidateTag('currentUserFollows')
  // Main feed data revalidation
  revalidateTag('recipes')
  // Profile data revalidation
  revalidateTag('profileFollowing')
  revalidateTag('profileFollowers')

  return await res.json()
  };

  export const getCurrentUserFollows = async (): Promise<number[] | []> => {
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
            next: { tags: ['currentUserFollows'] }
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
          next: { tags: ['currentUserFavorites'] }
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
revalidateTag('currentUserFavorites')
// Profile data revalidation
revalidateTag('favoritedRecipes')
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
revalidateTag('currentUserFavorites')
// Profile data revalidation
revalidateTag('favoritedRecipes')
return await res.json()
};

export const getProfileInfo = async (profileId: number): Promise<currentUserType> => {
  const res = await fetch(`${apiUrl}/users/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['profileInfo'] }
  })
  if (!res.ok) {
    if (res.status === 404) {
      return notFound()
    } else {
      throw Error("Unable to fetch profile information")
    } 
  }
  return res.json()
}

/** Retrieves the the expanded user data for users currently following a given user 
 * whose profile is being visited */
export const getProfileFollowers = async (profileId: number): Promise<currentUserType[]> => {
  const res = await fetch(`${apiUrl}/users/${profileId}/followers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['profileFollowers'] }
  })
  if (!res.ok) {
    throw Error("Unable to fetch followers")
  }
  return res.json()
}

/** Retrieves the the expanded user data for users currently being followed by a given user 
 * whose profile is being visited */
export const getProfileFollowing = async (profileId: number): Promise<currentUserType[]> => {
  const res = await fetch(`${apiUrl}/users/${profileId}/following`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
    next: { tags: ['profileFollowing'] }
  })
  if (!res.ok) {
    throw Error("Unable to fetch users being followed")
  }
  return res.json()
}