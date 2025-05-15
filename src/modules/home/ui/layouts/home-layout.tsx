import HomeNavbar from "@/modules/home/ui/components/home-navbar";
import { HomeSidebar } from "@/modules/home/ui/components/home-sidebar";
import Command from "@/modules/home/logic/command";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <HomeSidebar>
      <div>
        <HomeNavbar />
        <div className="max-w-screen-2xl mx-auto">
          {children}
        </div>
      </div>
      <Command />
    </HomeSidebar>
  );
};

export default HomeLayout;
