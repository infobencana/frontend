import { UserAvatar } from "../user/user-avatar";
import { UserFullname } from "../user/user-fullname";
import Editor from "../editor";
import dayjs from "dayjs";

export function DescriptionPost({ description, postBy, date }) {
  return (
    <div className="relative w-full h-fit p-10 border border-snow rounded-[14px]">
      <div className="flex items-center space-x-3 mb-9">
        <UserAvatar
          src={postBy?.picture}
          alt={postBy?.name}
          className="w-12 h-12"
          fallback={postBy?.name}
          fallBackSize={48}
        />
        <div className="flex flex-col space-y-0.5">
          <UserFullname fullname={postBy?.name} verified />
          <p className="text-gray text-xs font-medium">
            {dayjs(date).format("DD MMMM YYYY")}
          </p>
        </div>
      </div>
      {description ? (
        <Editor
          config={{
            editable: false,
            initialContent: JSON.parse(description),
          }}
        />
      ) : (
        false
      )}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-transparent"></div>
    </div>
  );
}
