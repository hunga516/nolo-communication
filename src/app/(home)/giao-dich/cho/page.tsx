import { UserContextProvider } from "@/contexts/user.context";
import { MarketsList } from "./markets-list"

const Page = async () => {
    return (
        <div className="p-4">
           <UserContextProvider>
            <MarketsList />
           </UserContextProvider>
        </div>
    );
}

export default Page;