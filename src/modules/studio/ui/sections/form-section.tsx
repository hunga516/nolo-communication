"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { videoUpdateSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { CopyCheckIcon, CopyIcon, Globe2Icon, ImagePlusIcon, Loader2Icon, Lock, MoreVerticalIcon, RotateCcwIcon, SparkleIcon, SparklesIcon, TrashIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import VideoPlayer from "@/modules/video/ui/components/video-player";
import Link from "next/link";
import { translateStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ThumbnailUploadModal from "../components/thumbnail-upload-modal";
import { VideoThumbnail } from "@/modules/video/ui/components/video-thumbnail";


interface FormSectionProps {
    videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {

    return (
        <Suspense fallback={<FormSectionSkeleton />}>
            <ErrorBoundary fallback={<p>error</p>}>
                <FormSectionSuspense videoId={videoId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const FormSectionSkeleton = () => {
    return (
        <div>loading ...</div>
    )
}

export const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
    const router = useRouter();
    const utils = trpc.useUtils();
    const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
    const [categories] = trpc.categories.getMany.useSuspenseQuery();

    const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false)

    const update = trpc.videos.update.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            utils.studio.getOne.invalidate({ id: videoId });
            toast.success("Cập nhật video thành công")
        },
        onError: () => {
            toast.error("Cập nhật video thất bại")
        }
    })

    const dilit = trpc.videos.delete.useMutation({
        onSuccess: () => {
            utils.studio.getMany.invalidate();
            toast.success("Video đã được xóa")
            router.push("/studio")
        },
        onError: () => {
            toast.error("Bạn không co quyền xóa video này")
        }
    })

    const handleGenerateThumbnail = trpc.videos.generateThumbnail.useMutation({
        onSuccess: () => {
            toast.success("Đang tạo hình thu nhỏ", { description: "Vui lòng chờ trong giây lát" })
        },
        onError: () => {
            toast.error("Không thể tạo hình thu nhỏ")
        }
    })

    const handleGenerateTitle = trpc.videos.generateTitle.useMutation({
        onSuccess: () => {
            toast.success("Đang tạo tiêu đề tự động", { description: "Vui lòng chờ trong giây lát" })
        },
        onError: () => {
            toast.error("Không thể tạo tiêu đề")
        }
    })

    const handleGenerateDescription = trpc.videos.generateDescription.useMutation({
        onSuccess: () => {
            toast.success("Đang tạo mô tả tự động", { description: "Vui lòng chờ trong giây lát" })
        },
        onError: () => {
            toast.error("Không thể tạo mô tả")
        }
    })




    const handleRestoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
        onSuccess: () => {
            utils.studio.getOne.invalidate({ id: videoId });
            utils.studio.getMany.invalidate();
            toast.success("Đã khôi phục hình thu nhỏ")
        },
        onError: () => {
            toast.error("Không thể khôi phục hình thu nhỏ")
        }
    })

    const form = useForm<z.infer<typeof videoUpdateSchema>>({
        resolver: zodResolver(videoUpdateSchema),
        defaultValues: video,
    })

    const onSubmit = async (data: z.infer<typeof videoUpdateSchema>) => {
        update.mutate(data)
    }

    const fullUrl = `${process.env.NEXT_PUBLIC_VPS_URL || "http://localhost:3000"}/videos/${video.id}`
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = async () => {
        await navigator.clipboard.writeText(fullUrl)
        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 3000)
    }

    return (
        <>
            <ThumbnailUploadModal
                videoId={video.id}
                onOpenChange={setThumbnailModalOpen}
                open={thumbnailModalOpen}
            />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="sticky top-0 z-10 flex pt-2 py-4 items-center justify-between mb-4 bg-white">
                        <div>
                            <h1 className="text-2xl font-bold">Thông tin video</h1>
                            <p className="text-xs text-muted-foreground">Quản lý video của bạn</p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={update.isPending}>
                                Lưu
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVerticalIcon />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => dilit.mutate({ id: videoId })}>
                                        <TrashIcon className="size-4" />
                                        Xoá video
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="space-y-8 lg:col-span-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Tiêu đề
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="rounded-full size-6 [&_svg]:size-3"
                                                    type="button"
                                                    onClick={() => handleGenerateTitle.mutate({ id: videoId })}
                                                    disabled={handleGenerateTitle.isPending}
                                                >
                                                    {handleGenerateTitle.isPending ? (
                                                        <Loader2Icon className="animate-spin" />
                                                    ) : (
                                                        <SparklesIcon />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Tiêu đề video"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex items-center gap-x-2">
                                                Mô tả
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="rounded-full size-6 [&_svg]:size-3"
                                                    type="button"
                                                    onClick={() => handleGenerateDescription.mutate({ id: videoId })}
                                                    disabled={handleGenerateDescription.isPending}
                                                >
                                                    {handleGenerateDescription.isPending ? (
                                                        <Loader2Icon className="animate-spin" />
                                                    ) : (
                                                        <SparklesIcon />
                                                    )}
                                                </Button>
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                value={field.value || ""}
                                                rows={10}
                                                placeholder="Mô tả của video"
                                                className="resize-none pr-10"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>

                            <FormField
                                name="thumbnailUrl"
                                control={form.control}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>
                                            Thumbnail
                                        </FormLabel>
                                        <FormControl>
                                            <div className="p-0.5 border border-dashed border-neutral-300 relative h-28 w-48 rounded-lg overflow-hidden group">
                                                {/* <Image
                                                    fill
                                                    alt="thumbnail"
                                                    src={video.thumbnailUrl || THUMBNAIL_FALLBACK}
                                                /> */}
                                                <VideoThumbnail
                                                    imageUrl={video.thumbnailUrl}
                                                    title={video.title}
                                                    previewUrl={video.previewUrl}
                                                    duration={video.duration}
                                                />
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="bg-black/50 hover:bg-black/50 absolute top-1 right-1
                                                        opacity-100 md:opacity-0 group-hover:opacity-100"
                                                        >
                                                            <MoreVerticalIcon className="text-white" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" side="top">
                                                        <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
                                                            <ImagePlusIcon className="size-4" />
                                                            Thay hình khác
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleGenerateThumbnail.mutate({ id: videoId })}
                                                        >
                                                            <SparkleIcon className="size-4" />
                                                            Tạo hình ảnh
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRestoreThumbnail.mutate({ id: videoId })}>
                                                            <RotateCcwIcon className="size-4" />
                                                            Tải lại hình gốc
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Doanh mục
                                            {/* add AI button */}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value || ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-1/2">
                                                    <SelectValue placeholder="Chọn danh mục" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        </div>
                        <div className="flex flex-col gap-y-8 lg:col-span-2">
                            <div className="flex flex-col gap-4 bg-gray-200 overflow-hidden h-fit rounded-lg">
                                <div className="aspect-video overflow-hidden relative">
                                    <VideoPlayer
                                        playbackId={video.muxPlaybackId}
                                        thumbnailUrl={video.thumbnailUrl}
                                    />
                                </div>
                                <div className="p-4 flex flex-col gap-y-6">
                                    <div className="flex justify-between items-center gap-x-2">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-xs text-muted-foreground">
                                                Đường dẫn video
                                            </p>
                                            <div className="flex items-center gap-x-2">
                                                <Link href={`/videos/${video.id}`}>
                                                    <p className="line-clamp-1 text-sm text-blue-500">
                                                        {fullUrl}
                                                    </p>
                                                </Link>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={isCopied}
                                                    onClick={onCopy}
                                                >
                                                    {isCopied ? <CopyCheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Trạng thái video
                                            </p>
                                            <p className="text-sm">
                                                {translateStatus(video.muxStatus || "Đang xử lý")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-y-1">
                                            <p className="text-muted-foreground text-xs">
                                                Trạng thái phụ đề
                                            </p>
                                            <p className="text-sm">
                                                {translateStatus(video.muxTrackStatus || "Đang xử lý")}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Chế độ hiển thị
                                            {/* add AI button */}
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value || ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-1/2">
                                                    <SelectValue placeholder="Chọn chế độ hiển thị" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="public">
                                                    <Globe2Icon className="size-4" />
                                                    Công khai
                                                </SelectItem>
                                                <SelectItem value="private">
                                                    <Lock className="size-4" />
                                                    Riêng tư
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>

                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
