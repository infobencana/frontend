import { UserAvatar } from "../user/user-avatar";
import { UserFullname } from "../user/user-fullname";

export function CommentCard({ comment }) {
  return (
    <div className="w-full flex items-start space-x-3">
      <UserAvatar
        src={comment?.photo_profile}
        alt={comment.name}
        className="w-11 h-11 xl:w-12 xl:h-12 ring-1 ring-snow"
        fallback={comment.name}
        fallBackSize={48}
      />
      <div>
        <UserFullname
          fullname={comment.name}
          verified={comment?.verified}
          time={comment.timestamp}
        />
        <p className="text-base text-black">{comment.comment}</p>
      </div>
    </div>
  );
}
