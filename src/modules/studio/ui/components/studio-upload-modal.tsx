import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {trpc} from "@/trpc/client";

const StudioUploadModal = () => {
    const utils = trpc.useUtils()
    const create = trpc.video.create.useMutation({
        onSuccess: () => utils.studio.getMany.invalidate()
    });

  return (
    <Button variant="outline" onClick={() => create.mutate()}>
      <Upload />
      Tải lên
    </Button>
  );
};

export default StudioUploadModal;
