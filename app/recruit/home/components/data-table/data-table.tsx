"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"

import { DataTablePagination } from "./data-table-pagination.tsx"
import { DataTableToolbar } from "./data-table-toolbar.tsx"
import { Student, StudentList } from "@/app/recruit/home/data/student-schema.ts";
import { tree } from "next/dist/build/templates/app-page";
import {useContext, useEffect, useState} from "react";
import { StudentDataContext, StudentDataContextType } from "@/app/recruit/home/components/dashboard.tsx";
import internal from "node:stream";
import {StudentColumns} from "@/app/recruit/home/components/data-table/student-columns.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setCurrentStudent: (student: Student) => void
  setStudentView: React.Dispatch<React.SetStateAction<boolean>>
  c: (classnames: string, conditionalNames: string, condition?: boolean) => string
  setPage: React.Dispatch<React.SetStateAction<number>>
}


export function DataTable<TData, TValue>({
  columns,
  data,
  setCurrentStudent,
  setStudentView,
  c,
  setPage
}: DataTableProps<TData, TValue>) {
  const { currentStudent, setStudentList, studentList } = useContext(StudentDataContext) as StudentDataContextType
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  // const [pagination, setPagination] = useState({
  //   pageIndex: 3, // initial page index
  //   pageSize: 10, // default page size
  // });
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      // pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false
  })
  // useEffect(() => {
  //   console.log("changed student list from data table")
  //   table.setPageIndex(2)
  //   // setPagination({pageIndex: 3, pageSize: pagination.pageSize})
  // }, [currentStudent]);
  // useEffect(() => {
  //     if (currentStudent) {
  //         const selectedRow = table.getRowModel().rows.find(row => (row.original as Student)?.id === currentStudent.id);
  //         if (selectedRow) {
  //             selectedRow.toggleSelected(true);
  //         }
  //     }
  // }, [currentStudent]);

  return (
    <div className="flex flex-col space-y-4 h-full justify-between overflow-auto px-1 py-2">
      <DataTableToolbar table={table} c={c} />

      <div className="grow overflow-auto ">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      const student = row.original as Student;

                      if (student && student.id !== (currentStudent?.id ?? "")) {
                        setCurrentStudent(row.original as Student);
                      }
                      setStudentView(true);
                      // table.toggleAllRowsSelected(false)
                      // row.toggleSelected(!row.getIsSelected())
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} c={c} setPage={setPage} />
    </div>
  )
}
