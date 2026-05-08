import type { ReactNode, HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Constrains content to 980px centered, while parent backgrounds can bleed
 * full-width. Responsive horizontal padding for smaller viewports.
 */
export default function Container({ children, className = "", ...rest }: ContainerProps) {
  return (
    <div
      {...rest}
      className={`w-full max-w-[980px] mx-auto px-6 ${className}`}
    >
      {children}
    </div>
  );
}
