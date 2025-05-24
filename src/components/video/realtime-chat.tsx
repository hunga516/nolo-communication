"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface RealTimeChatProps {
    videoId: string
}

const RealTimeChat = ({ videoId }: RealTimeChatProps) => {
    const pathName = usePathname()
    const [messages, setMessages] = useState<string[]>([])
    const [messageSend, setMessageSend] = useState<string>('') // khởi tạo với chuỗi rỗng
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        const socket = io(`http://localhost:8080/live-stream`, {
            query: { videoId }
        });

        socketRef.current = socket

        socket.on('connect', () => {
            console.log('Connected', socket.id);
        });

        socket.on('receive-create-message', (message: string) => {
            setMessages((prev) => [...prev, message])
        })


        return () => {
            console.log('Disconnecting socket', socket.id);
            socket.disconnect();
        };
    }, [videoId, pathName]);

    const handleSubmit = () => {
        if (messageSend.trim()) {
            socketRef.current?.emit('create-message', messageSend)
            setMessageSend('')
        }
    }

    return (
        <div>
            <div>
                {messages.map((item, index) => (
                    <Button key={index} variant="outline">{item}</Button>
                ))}
            </div>
            <Input
                placeholder='Nhập tin nhắn...'
                value={messageSend}
                onChange={(e) => setMessageSend(e.target.value)}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default RealTimeChat
