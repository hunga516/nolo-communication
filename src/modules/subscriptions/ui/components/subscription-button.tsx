import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isSubscribed?: boolean;
    className?: string;
    size: "default" | "sm" | "lg";
}

export const SubscriptionButton = ({
    onClick,
    disabled = false,
    isSubscribed,
    className,
    size,
}: SubscriptionButtonProps) => {
    return (
        <Button
            size={size}
            variant={isSubscribed ? "secondary" : "default"}
            className={cn(
                "",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {isSubscribed ? "Huỷ theo dõi" : "Theo dõi"}
        </Button>
    );
}