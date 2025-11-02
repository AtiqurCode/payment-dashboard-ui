import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

export const ProfileAvatar = ({ 
  avatarUrl, 
  name = "User",
  size = "lg" 
}: ProfileAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const getInitials = () => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Avatar className={`${sizeClasses[size]}`}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className={`${textSizeClasses[size]} font-semibold bg-primary text-primary-foreground`}>
        {avatarUrl ? <User className="h-8 w-8" /> : getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};

