import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp, SearchX } from "lucide-react";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: any[];
  defaultSortKey?: keyof T;
  defaultSortDirection?: "asc" | "desc";
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  defaultSortKey,
  defaultSortDirection = "asc",
}: TableProps<T>) => {
  const [sortField, setSortField] = useState<keyof T | null>(
    defaultSortKey || null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );

  const handleSort = (key: keyof T) => {
    if (sortField === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <SearchX className="w-12 h-12 mb-3 text-gray-500" />
        <p className="text-lg font-medium">No results found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="min-w-full overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`py-3 pr-8 ${
                  column.sortable ? "cursor-pointer" : ""
                }`}
                onClick={
                  column.sortable ? () => handleSort(column.key) : undefined
                }
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && sortField === column.key && (
                    <>
                      {sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-gray-300 border-t border-[#2A2A2A]"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="py-3 pr-8">
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
