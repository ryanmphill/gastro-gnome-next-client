interface ParamsProp {
    params?: {
        id?: string
    }
}

const ProfileFavsTab = ({params} : ParamsProp) => {
    return <>
    <h2>Favorites Tab for Profile #{params?.id}</h2>
    </>
}
export default ProfileFavsTab