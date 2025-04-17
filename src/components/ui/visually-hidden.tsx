import * as React from "react"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0"
        style={{
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
        }}
      >
        {children}
      </span>
    )
  }
)

VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden } 