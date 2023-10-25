import { useMediaQuery } from "@/hooks/use-media-query";
import { UserAvatar } from "../user/user-avatar";
import { UserFullname } from "../user/user-fullname";
import { getTimeFromNow } from "@/utils/date";

export function CommentCard({ comment }) {
  const matches = useMediaQuery("(max-width:1280px)");

  return (
    <div className="w-full flex items-start space-x-3 fade-in-30 duration-500 transition-all">
      <UserAvatar
        src={comment.photo_profile}
        alt={comment.full_name}
        className="w-10 h-10 xl:w-12 xl:h-12 ring-1 ring-snow"
        fallback={comment.full_name}
        fallBackSize={matches ? 40 : 48}
      />
      <div>
        <UserFullname
          fullname={comment.full_name}
          verified={comment.role === "admin"}
          time={getTimeFromNow(comment.timestamp)}
        />
        <p className="text-sm xl:text-base text-black mt-1 xl:mt-0">
          {comment.comment}
        </p>
      </div>
    </div>
  );
}
