import Command from "@/modules/home/logic/command";
import {StudioSidebar} from "@/modules/studio/ui/components/studio-sidebar";
import StudioNavbar from "@/modules/studio/ui/components/studio-navbar";

interface StudioLayoutProps {
  children: React.ReactNode;
}

const StudioLayout = ({ children }: StudioLayoutProps) => {
  return (
    <StudioSidebar>
      <div>
          <StudioNavbar />
          {children}
      </div>
      <Command />
    </StudioSidebar>
  );
};

export default StudioLayout;
