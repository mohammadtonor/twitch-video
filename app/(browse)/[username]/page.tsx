import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isfollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({
  params
}: UserPageProps) => {    
  const user = await getUserByUsername(params.username);

  if (!user || !user.streame) {
    notFound();
  }

  const isFollowing = await isfollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return ( 
    <StreamPlayer
      user={user}
      stream={user.streame}
      isFollowing={isFollowing}
    />
  );
}
 
export default UserPage;