"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = Pick<ButtonProps, "className" | "size" | "variant">;

export function LogoutButton({
  className,
  size,
  variant = "outline",
}: LogoutButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      queryClient.clear();
      router.replace("/login");
      router.refresh();
    } catch {
      setIsPending(false);
    }
  }

  return (
    <Button
      className={className}
      disabled={isPending}
      onClick={handleLogout}
      size={size}
      type="button"
      variant={variant}
    >
      <LogOut className="size-4" />
      {isPending ? "Signing out" : "Sign out"}
    </Button>
  );
}
