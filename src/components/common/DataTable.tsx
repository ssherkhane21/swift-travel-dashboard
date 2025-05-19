
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Download } from 'lucide-react';

interface DataTableProps<T> {
  columns: {
    key: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  data: T[];
  rowsPerPageOptions?: number[];
  searchPlaceholder?: string;
  allowCSVExport?: boolean;
  allowPDFExport?: boolean;
}

export const DataTable = <T extends { id?: string | number }>({
  columns,
  data,
  rowsPerPageOptions = [10, 25, 50],
  searchPlaceholder = 'Search...',
  allowCSVExport = false,
  allowPDFExport = false,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => 
    Object.values(item).some(
      (value) => 
        value !== null && 
        value !== undefined && 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data if sort column is selected
  const sortedData = sortColumn 
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn as keyof typeof a];
        const bValue = b[sortColumn as keyof typeof b];
        
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        const compareResult = aValue > bValue ? 1 : -1;
        return sortDirection === 'asc' ? compareResult : -compareResult;
      })
    : filteredData;

  // Paginate data
  const pageCount = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Handle CSV export
  const handleCSVExport = () => {
    // Implementation for CSV export
    console.log('Exporting to CSV...');
  };

  // Handle PDF export
  const handlePDFExport = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 w-full sm:w-auto min-w-[240px]"
          />
        </div>

        <div className="flex gap-2">
          {allowCSVExport && (
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={handleCSVExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          )}
          
          {allowPDFExport && (
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={handlePDFExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b">
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-1"
                        onClick={() => handleSort(column.key)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="p-4">
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="h-32 text-center text-muted-foreground"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {paginatedData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm whitespace-nowrap">
              Page {currentPage} of {pageCount || 1}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage >= pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} rows
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
