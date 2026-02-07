import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function UserAvatar() {
  return (
    <div className="mt-auto p-4">
      <Separator className="mb-3" />
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
          G
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">Gabriel</p>
          <p className="text-xs text-muted-foreground truncate">gabriel@email.com</p>
        </div>
        <Button variant="outline" size="icon">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}