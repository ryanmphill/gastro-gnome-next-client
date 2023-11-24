interface ParamsProp {
    params?: {
        id?: string
    }
}

const ProfilePostsTab = ({params} : ParamsProp) => {
    return <>
    <h2>Profile # {params?.id} Index Page - Profile Posts Tab</h2>
    </>
}
export default ProfilePostsTab