import { ResponsiveDialog } from "@/components/responsive-dialog";
import { UploadDropzone } from "@/lib/uploadthings";
// import { ReactNode } from "react";
// type ContentField = ReactNode

import './uploadthing.css'

interface ThumbnailUploadModalProps {
    videoId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


// type UploadButtonProps = {
//     /* rest of props */
//     content?: {
//         button?: ContentField;
//         allowedContent?: ContentField;
//     };
// };

// type UploadDropzoneProps = {
//     /* rest of props */
//     content?: {
//         uploadIcon?: ContentField;
//         label?: ContentField;
//         allowedContent?: ContentField;
//         button?: ContentField;
//     };
// };


const ThumbnailUploadModal = ({
    videoId,
    open,
    onOpenChange,
}: ThumbnailUploadModalProps) => {
    console.log("videoId", videoId);
    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Upload Thumbnail"
        >
            <UploadDropzone
                className="bg-muted pt-12 pb-12"
                endpoint="imageUploader"
                content={{
                    button({ ready, isUploading }) {
                        if (isUploading) return <div>Đang tải lên...</div>;  // Thêm nội dung khi đang tải lên
                        if (ready) return <div>Tải lên ngay</div>;
                        return "";
                    },
                    allowedContent({ ready, isUploading }) {
                        if (!ready) return "Đang kiểm tra";
                        if (isUploading) return "Đang tải lên vui lòng chờ";
                        return "Bạn có thể tải lên hình ảnh, video, và ảnh GIF. Kích thước tối đa là 10MB.";
                    }
                }}
                appearance={{
                    button({ ready, isUploading }) {
                        return `custom-button ${ready ? "custom-button-ready" : "custom-button-not-ready"} ${isUploading ? "custom-button-uploading" : ""}`;
                    },
                    container: "custom-container",
                    allowedContent: "custom-allowed-content",
                }}
            />
        </ResponsiveDialog>
    );
}

export default ThumbnailUploadModal;