'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={(open) => {
      if (!open) router.back()
    }}>
      <DialogContent className='mt-16 w-full md:min-w-[1300px]'>
        <ScrollArea className="h-screen">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}