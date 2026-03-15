import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge("flex items-center border-b border-border px-5 py-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TableRow.displayName = "TableRow";

interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  width?: number | "fill";
}

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
  ({ children, width, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: width === "fill" ? "100%" : width,
          flex: width === "fill" ? 1 : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TableCell.displayName = "TableCell";

export const TableRankCell = forwardRef<
  HTMLDivElement,
  Omit<TableCellProps, "width"> & { rank: number }
>(({ rank, className, ...props }, ref) => {
  return (
    <TableCell ref={ref} width={40} className={className} {...props}>
      <span className="font-mono text-sm text-text-tertiary">#{rank}</span>
    </TableCell>
  );
});

TableRankCell.displayName = "TableRankCell";

export const TableScoreCell = forwardRef<
  HTMLDivElement,
  Omit<TableCellProps, "width"> & { score: number; maxScore?: number }
>(({ score, maxScore = 10, className, ...props }, ref) => {
  const getScoreColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) return "text-accent-green";
    if (percentage >= 40) return "text-accent-amber";
    return "text-accent-red";
  };

  return (
    <TableCell ref={ref} width={60} className={className} {...props}>
      <span className={`font-mono text-sm font-bold ${getScoreColor()}`}>
        {score.toFixed(1)}
      </span>
    </TableCell>
  );
});

TableScoreCell.displayName = "TableScoreCell";

export const TableCodeCell = forwardRef<
  HTMLDivElement,
  Omit<TableCellProps, "width">
>(({ children, className, ...props }, ref) => {
  return (
    <TableCell ref={ref} width="fill" className={className} {...props}>
      <span className="font-mono text-xs text-text-secondary truncate block">
        {children}
      </span>
    </TableCell>
  );
});

TableCodeCell.displayName = "TableCodeCell";

export const TableLangCell = forwardRef<
  HTMLDivElement,
  Omit<TableCellProps, "width"> & { language: string }
>(({ language, className, ...props }, ref) => {
  return (
    <TableCell ref={ref} width={100} className={className} {...props}>
      <span className="font-mono text-xs text-text-tertiary">{language}</span>
    </TableCell>
  );
});

TableLangCell.displayName = "TableLangCell";
