interface ParamsProp {
    params?: {
        id?: string
    }
}

const ProfileFollowingTab = ({params} : ParamsProp) => {
    return <>
    <h2>Following Tab for Profile #{params?.id}</h2>
    </>
}
export default ProfileFollowingTab