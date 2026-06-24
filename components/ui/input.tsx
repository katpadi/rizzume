import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-sm text-zinc-800 transition-colors outline-none placeholder:text-zinc-300 hover:border-amber-200 focus-visible:border-amber-300 focus-visible:ring-2 focus-visible:ring-amber-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
