import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import * as React from "react";
import { useContext, useEffect } from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";

interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  c: (classnames: string, conditionalNames: string, condition?: boolean) => string,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function DataTablePagination<TData>({
  table,
  c,
  setPage
}: DataTablePaginationProps<TData>) {
  const { currentStudent, studentList } = useContext(StudentDataContext) as StudentDataContextType

  return (
    <div className="flex items-center justify-between px-2">
      <div className={c("hidden flex-1 text-sm text-muted-foreground", "lg:block", false)}>
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className={c("flex gap-4 justify-center items-center", "lg:space-x-8", false)}>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row">
          <div className={c("flex items-center justify-center text-sm font-medium", "lg:w-[100px]", false)}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className={c("hidden h-8 w-8 p-0", "lg:flex", false)}
              onClick={() => {
                table.setPageIndex(0)
                // setPage(table.getState().pagination.pageIndex)
              }
              }
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.previousPage()
                // setPage(table.getState().pagination.pageIndex)
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.nextPage()
                // setPage(table.getState().pagination.pageIndex)
              }
              }
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className={c("hidden h-8 w-8 p-0", "lg:flex", false)}
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1)
                // setPage(table.getState().pagination.pageIndex)
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
