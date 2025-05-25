"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useClerk } from '@clerk/nextjs'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'

interface RealTimeChatProps {
    videoId: string
}

interface Message {
    messageSend: string;
    userSendImage: string;
}


const RealTimeChat = ({ videoId }: RealTimeChatProps) => {
    const { user } = useClerk()
    const pathName = usePathname()
    const [messages, setMessages] = useState<Message[]>([])
    const [messageSend, setMessageSend] = useState<string>('')
    const socketRef = useRef<Socket | null>(null)
    const chatAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/live-stream`, {
            query: { videoId }
        });

        socketRef.current = socket

        socket.on('connect', () => {
            console.log('Connected', socket.id);
        });

        socket.on('receive-create-message', ({ messageSend, userSendImage }) => {
            setMessages((prev) => [...prev, { messageSend, userSendImage }])
        })


        return () => {
            console.log('Disconnecting socket', socket.id);
            socket.disconnect();
        };
    }, [videoId, pathName]);

    useEffect(() => {
        chatAreaRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSubmit = () => {
        if (messageSend.trim()) {
            socketRef.current?.emit('create-message', { messageSend, userSendImage: user?.imageUrl })
            setMessageSend('')
        }
    }

    return (
        <div className='flex flex-col gap-1'>
            <ScrollArea className='h-[400px] pr-2 border border-solid rounded-sm py-1 px-2'>
                <div className="flex flex-col gap-2">
                    {messages.map((item, index) =>
                        item.userSendImage === user?.imageUrl ? (
                            <div key={index} className='flex items-center'>
                                <div className='px-2 py-1 w-full rounded-sm'>
                                    <p className='float-right text-sm'>
                                        {item.messageSend}
                                    </p>
                                </div>
                                <Image src={item.userSendImage} width={24} height={24} className='rounded-full' alt='avatar' />
                            </div>
                        ) : (
                            <div key={index} className='flex items-center'>
                                <Image src={item.userSendImage} width={24} height={24} className='rounded-full' alt='avatar' />
                                <p className='p-2 w-full rounded-md'>
                                    {item.messageSend}
                                </p>
                            </div>
                        )
                    )}
                    <div ref={chatAreaRef} /> {/* ref đặt ở cuối */}
                </div>
            </ScrollArea >
            <Input
                placeholder='Nhập tin nhắn...'
                value={messageSend}
                onChange={(e) => setMessageSend(e.target.value)}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </div >
    )
}

export default RealTimeChat
