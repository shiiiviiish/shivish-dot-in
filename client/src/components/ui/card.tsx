import * as React from "react"

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
)
Card.displayName = "Card"

export { Card }