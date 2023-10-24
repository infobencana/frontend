import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";
import { UserAvatar } from "../user/user-avatar";
import { TextArea } from "../ui/text-area";
import { useState } from "react";
import { addComment, getComment } from "@/api/disaster";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { CommentCard } from "../card/comment-card";
import { Spinner } from "../ui/spinner";

export function Comment({ disasterId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { toast } = useToast();

  const submitComment = async (e) => {
    e.preventDefault();

    if (!text) return;

    try {
      setLoading(true);
      const updatedComment = await addComment(disasterId, { comment: text });
      setComments(updatedComment.data.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Komen anda gagal ditambahkan",
      });
    } finally {
      setText("");
      setLoading(false);
    }
  };

  const getInitialComment = async () => {
    try {
      setLoading(true);
      const response = await getComment(disasterId);
      setComments(response.data.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal mengambil data komen",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialComment();
  }, []);

  return (
    <div className="w-full h-auto py-10 rounded-none xl:p-[35px] bg-[#F9FAFB] xl:rounded-[14px] my-14 xl:my-0">
      <div className="w-full flex space-x-4 items-start">
        <UserAvatar
          src={user.photo_profile}
          alt={user.full_name}
          className="w-11 h-11 xl:w-12 xl:h-12"
          fallback={user.full_name}
          fallBackSize={48}
        />
        <form className="w-full" onSubmit={submitComment}>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={cn(
              "min-h-[120px] bg-white border border-snow rounded-[14px] text-sm py-4 px-7 outline-green",
              loading ? "animate-pulse duration-700" : "",
            )}
            placeholder="Masukan komentar disini..."
            disabled={loading}
          />
          <Button size="sm" type="submit" className="mt-3 rounded-lg p-5">
            Kirim
          </Button>
        </form>
      </div>
      <div className="flex flex-col space-y-8 mt-12">
        {loading && !comments ? (
          <div className="w-full h-96 flex items-center justify-center">
            <Spinner className="w-9 h-9 text-green" />
          </div>
        ) : (
          false
        )}
        {comments
          ? comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          : false}
      </div>
    </div>
  );
}