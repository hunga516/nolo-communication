import { Button } from "@/components/ui/button";
import MuxUploader, { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress, MuxUploaderStatus } from "@mux/mux-uploader-react";
import Image from "next/image";
import { useState } from "react";

interface StudioUploaderProps {
    endpoint?: string | null;
    onSuccess?: () => void;
}

const UPLOADER_ID = "studio-uploader";

export const StudioUploader = ({
    endpoint,
    onSuccess
}: StudioUploaderProps) => {
    const [hasFile, setHasFile] = useState(false);

    const handleUploadStart = () => {
        setHasFile(true);
    }

    return (
        <div>
            <MuxUploader
                endpoint={endpoint}
                onSuccess={onSuccess}
                className="hidden group/uploader"
                id={UPLOADER_ID}
                onUploadStart={handleUploadStart}
            />
            <MuxUploaderDrop
                muxUploader={UPLOADER_ID}
                className={`group/drop p-8 rounded-2xl ${hasFile ? "border-none" : "border-dashed  border-2 border-gray-400"}`}
            >
                <div slot="heading" className="flex flex-col items-center gap-6">
                    <Image
                        src="/img/video-format-cuted.png"
                        draggable="false"
                        width={300}
                        height={60}
                        alt="video format"
                    />
                    <p className="font-semibold">Kéo và thả tệp video của bạn vào đây</p>
                    <p className="-mt-4 text-sm text-muted-foreground">Video của bạn sẽ được riêng tư cho đến khi bạn công khai</p>
                    <MuxUploaderFileSelect
                        muxUploader={UPLOADER_ID}
                    >
                        <Button>
                            Chọn tệp
                        </Button>
                    </MuxUploaderFileSelect>
                </div>
                <span slot="separator" className="hidden"></span>
                <MuxUploaderProgress
                    muxUploader={UPLOADER_ID}
                    type="percentage"
                />
                <MuxUploaderProgress
                    muxUploader={UPLOADER_ID}
                    type="bar"
                />
                <MuxUploaderStatus
                    muxUploader={UPLOADER_ID}
                    className=""
                />
            </MuxUploaderDrop>
        </div>
    )
}