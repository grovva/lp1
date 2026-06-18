import type { ReactNode } from "react";

type GrowUnderlineProps = {
  children: ReactNode;
  className?: string;
  /** classes do traço (largura/posição), ex.: "w-full" ou "w-10" */
  lineClassName?: string;
  color?: string;
  delay?: number;
};

// Label sem caixa com um traço que cresce por baixo (esquerda → direita) ao entrar.
export function GrowUnderline({
  children,
  className,
  lineClassName = "w-full",
  color = "#3EA85C",
  delay = 0.25,
}: GrowUnderlineProps) {
  return (
    <span className="relative inline-block pb-1.5">
      <span className={className}>{children}</span>
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] origin-left rounded-full ${lineClassName}`}
        style={{ background: color, animation: `growUnderline 0.7s ${delay}s cubic-bezier(0.4,0,0.2,1) both` }}
      />
    </span>
  );
}
