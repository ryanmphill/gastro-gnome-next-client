interface ParamsProp {
    params?: {
        id?: string
    }
}

const ProfileFollowersTab = ({params} : ParamsProp) => {
    return <>
    <h2>Followers Tab for Profile #{params?.id}</h2>
    </>
}
export default ProfileFollowersTab