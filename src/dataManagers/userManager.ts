const apiUrl:string = "http://localhost:8000";

export const followUser = async (id: number) => {
    const res = await fetch(`${apiUrl}/users/${id}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("gastro_token")}`
    }
  })
  if (!res.ok) {
    throw new Error("Failed to follow user")
  }
  return await res.json()
  };

export const unFollowUser = async (id: number) => {
    const res = await fetch(`${apiUrl}/users/${id}/unfollow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("gastro_token")}`
    }
  })
  if (!res.ok) {
    throw new Error("Failed to follow user")
  }
  return await res.json()
  };