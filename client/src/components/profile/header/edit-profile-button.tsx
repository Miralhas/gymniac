import { Button } from "@/components/ui/button";

const EditProfileButton = () => {
  return (
    <Button
      variant="cool"
      className="text-lg md:h-10 md:px-6 md:has-[>svg]:px-4 rounded-2xl text-emerald-500/90 bg-primary/30 transition-transform hover:scale-105 duration-300 ease-in-out"
    >
      Edit Profile
    </Button>
  )
}

export default EditProfileButton;
