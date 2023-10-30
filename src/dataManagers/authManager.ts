const apiUrl:string = "http://localhost:8000";

export const loginUser = async (user : {username: string, password: string}) => {
    const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  })
  return await res.json()
  };

  type newUserType = {
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string
  };

  export const registerUser = async (newUser: newUserType) => {
    const res = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    return await res.json()
  };

  type currentUserType = {
    id: number,
    bio: string,
    image_url: string,
    full_name: string,
    date_joined: string,
    favorites: number[],
    following: number[]
  };

  export const getCurrentUser = async (): Promise<currentUserType> => {
    const res = await fetch(`${apiUrl}/users/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("gastro_token")}`,
      },
    })
    return await res.json()
};