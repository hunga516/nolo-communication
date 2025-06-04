import HomeNavbar from "@/components/home/home-navbar";
import { HomeSidebar } from "@/components/home/home-sidebar";
import Command from "@/modules/home/logic/command";
import { HomeBreadcumb } from "@/modules/home/ui/components/breadcum";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <HomeSidebar>
      <div>
        <HomeNavbar />
        <div className="max-w-screen-2xl mx-auto mt-16">
          <HomeBreadcumb />
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
      <Command />
    </HomeSidebar>
  )
};

export default Layout;
