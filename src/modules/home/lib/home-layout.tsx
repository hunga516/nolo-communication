import { SidebarProvider } from "@/components/ui/sidebar"

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full">
                <p>home navbar</p>
                
                <div>{children}</div>
            </div>
        </SidebarProvider>
    )
}

export default HomeLayout