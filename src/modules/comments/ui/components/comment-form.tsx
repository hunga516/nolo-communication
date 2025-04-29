import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { commentInsertSchema } from "@/db/schema"
import { trpc } from "@/trpc/client"
import { useClerk, useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

interface CommentFormProps {
    videoId: string
    onSuccess?: () => void
}

export const CommentForm = ({
    videoId,
    onSuccess
}: CommentFormProps) => {
    const { user } = useUser()
    const clerk = useClerk()
    const utils = trpc.useUtils()

    const create = trpc.comments.create.useMutation({
        onSuccess: () => {
            utils.comments.getMany.invalidate({ videoId })
            form.reset()
            toast.success("Bình luận đã được đăng")
            onSuccess?.()
        },
        onError: (error) => {
            toast.error("Có lỗi khi đăng bình luận")
            if (error.data?.code === "BAD_GATEWAY") {
                clerk.openSignIn()
            }
            console.log(error)
        }
    })

    const commentInsertSchemaWithouUserId = commentInsertSchema.omit({ userId: true })
    const form = useForm<z.infer<typeof commentInsertSchemaWithouUserId>>({
        resolver: zodResolver(commentInsertSchemaWithouUserId),
        defaultValues: {
            videoId,
            value: "",
        }
    })

    const handleSubmit = (values: z.infer<typeof commentInsertSchemaWithouUserId>) => {
        create.mutate(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex items-start gap-2 group">
                <div className="">
                    <Avatar className={`size-8`}>
                        <AvatarImage src={user?.imageUrl || "/img/user_placeholder.png"} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </div>
                <div className="w-full">
                    <FormField
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Đăng bình luận của bạn ..."
                                        className="resize-none bg-transparent overflow-hidden min-h-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="justify-end gap-2 mt-2 flex">
                        <Button
                            disabled={create.isPending}
                            type="submit"
                            size="sm"
                        >
                            Bình luận
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}