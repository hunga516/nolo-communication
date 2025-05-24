

interface PageProps {
    params: Promise<{ videoId: string }>
}

const Page = async ({ params }: PageProps) => {
    const { videoId } = await params
    return (
        <div>hi details {videoId}</div>
    )
}

export default Page;