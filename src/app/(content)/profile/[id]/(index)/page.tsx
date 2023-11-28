import { ProfileAuthoredPosts } from "@/components/profile/nested/ProfileAuthoredPosts";

interface ParamsProp {
    params: {
        id: string
    }
}

const ProfilePostsTab = ({params} : ParamsProp) => {
    let profileId: number;

    try {
        profileId = parseInt(params.id)
    } catch (err) {
        profileId = 0 // Redirects to 'not found' page
    }
    return <>
        <ProfileAuthoredPosts profileId={profileId} />
    </>
}
export default ProfilePostsTab