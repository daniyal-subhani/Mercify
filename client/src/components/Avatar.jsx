import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sizeClasses = {
  sm: "w-14 h-14",
  md: "w-18 h-18",
  lg: "w-24 h-24",
};

const ProfilePicture = ({ src, alt = "User", size = "md", className = "" }) => {
  const initials =
    alt
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2) || "U";

  return (
    <Avatar className={`${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePicture;
