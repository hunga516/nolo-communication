import { Button } from "@/components/ui/button";
import { Loader2Icon, Upload } from "lucide-react";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { StudioUploader } from "@/modules/studio/ui/components/studio-uploader";

const StudioUploadModal = () => {
    const utils = trpc.useUtils()
    const create = trpc.videos.create.useMutation({
        onSuccess: () => {
            toast.success("Video mới đã được thêm")
            utils.studio.getMany.invalidate()
        },
        onError: err => {
            toast.error(err.message)
        }
    });

    return (
        <>
            <Button
                variant="outline"
                onClick={() => create.mutate()}
                disabled={create.isPending}
            >
                {create.isPending ? <Loader2Icon className="animate-spin" /> : <Upload />}
                Tải lên
            </Button>
            <ResponsiveDialog
                open={!!create.data}
                title={"Tải lên video mới"}
                onOpenChange={() => create.reset()}
            >
                <StudioUploader endpoint={create.data?.url} />
            </ResponsiveDialog>
        </>
    );
};

export default StudioUploadModal;
