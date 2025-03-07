import { SidebarProvider } from "@/components/ui/sidebar"
import HomeNavbar from "@/modules/home/ui/components/home-navbar";
import {AppSidebar} from "@/modules/home/ui/components/home-sidebar/app-sidebar";
import {HomeSidebar} from "@/modules/home/ui/components/home-sidebar";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <HomeSidebar>
            <div className="w-full">
                <div>
                    <HomeNavbar/>
                    {children}
                </div>
            </div>
        </HomeSidebar>
    )
}

export default HomeLayout