const Page = () => {
    return (
        <div>
            <iframe
                className="w-full h-screen"
                src="http://localhost:3001/meeting"
                allow="camera; microphone; display-capture"
            />
        </div>
    );
}

export default Page;