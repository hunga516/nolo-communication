import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";

const InputSearch = () => {

    return (
        <div className="relative  sm:min-w-sm">
            <Input
                type="text"
                placeholder="Tìm kiếm ..."
            />
            <Badge
                variant="secondary"
                className="max-sm:hidden absolute top-1/2 -translate-y-1/2 right-2"
            >
                Command K
            </Badge>
        </div>
    )
}

export default InputSearch;