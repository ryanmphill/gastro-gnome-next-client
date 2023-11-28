import { ProfileFavoritedPosts } from "@/components/profile/nested/ProfileFavoritedPosts";

interface ParamsProp {
    params: {
        id: string
    }
}

const ProfileFavsTab = ({params} : ParamsProp) => {
    console.log("params", params)
    let profileId: number;

    try {
        profileId = parseInt(params.id)
    } catch (err) {
        profileId = 0 // Redirects to 'not found' page
    }

    return <>
    <ProfileFavoritedPosts profileId={profileId} />
    </>
}
export default ProfileFavsTab