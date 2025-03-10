import {NavUser} from "@/modules/home/ui/components/home-sidebar/nav-user";

const AuthButton = () => {
   const user = {
           name: "shadcn",
           email: "m@example.com",
           avatar: "https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj",
       }

    return (
    <div className="max-w-sm">
        <NavUser user={user} />
    </div>
    )
}

export default AuthButton;