import {Input} from "@/components/ui/input";
import {NavUser} from "@/modules/home/ui/components/home-sidebar/nav-user";
import {data} from "@/modules/home/ui/components/home-sidebar/app-sidebar";
import InputSearch from "@/modules/home/ui/components/home-navbar/input-search";

const HomeNavbar = () => {

  const user = {
        name: "shadcn",
            email: "m@example.com",
            avatar: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
    }

    return (
        <div className="flex items-center justify-between border-b px-4 py-2 h-16 w-full bg-[#FAFAFA]">
            {/*Input search*/}
            <InputSearch />

            {/*Auth icon*/}
           <div className="max-w-sm">
               <NavUser user={user} />
           </div>
        </div>
    )
}

export default HomeNavbar;