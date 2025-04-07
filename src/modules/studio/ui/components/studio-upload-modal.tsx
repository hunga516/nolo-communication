import { Button } from "@/components/ui/button";
import {Loader2Icon, Upload} from "lucide-react";
import {trpc} from "@/trpc/client";
import {toast} from "sonner";

const StudioUploadModal = () => {
    const utils = trpc.useUtils()
    const create = trpc.video.create.useMutation({
        onSuccess: () => {
            toast.success("Video mới đã được thêm")
            utils.studio.getMany.invalidate()
        },
        onError: err => {
            toast.error(err.message)
        }
    });

  return (
    <Button
        variant="outline"
        onClick={() => create.mutate()}
        disabled={create.isPending}
    >
        {create.isPending ? <Loader2Icon className="animate-spin" /> : <Upload />}
      Tải lên
    </Button>
  );
};

export default StudioUploadModal;
