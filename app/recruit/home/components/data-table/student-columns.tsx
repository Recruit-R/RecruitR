"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox.tsx"


import useScreenWidth from "@/hooks/use-screen-width.ts"
import { parseISO } from "date-fns"
import { years } from "../../data/student-data.tsx"
import { DataTableColumnHeader } from "./data-table-column-header.tsx"

export const StudentColumns = (feedbackFocus: any): ColumnDef<any>[] => {
  const widthSize = useScreenWidth()
  const breakWidth = 768
  const columns = ([
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: ({ row }) => <div className="w-1/2 md:w-[40px]">{row.getValue("first_name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: ({ row }) => <div className="w-1/2 md:w-[40px]">{row.getValue("last_name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "university",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="University" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("university")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "gpa",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GPA" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("gpa")}</div>,
      enableSorting: true,
      enableHiding: false,
      sortUndefined: -1
    },
    {
      accessorKey: "avgRating",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avg. Rating" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{(Math.round(parseFloat(row.getValue("avgRating")) * 100) / 100).toFixed(2)}</div>,
      enableSorting: true,
      enableHiding: false,
      sortingFn: (rowA, rowB) => {
        const ratingA = parseFloat(rowA.getValue("avgRating"));
        const ratingB = parseFloat(rowB.getValue("avgRating"));
        if (ratingA < ratingB) {
          return -1;
        }
        if (ratingA > ratingB) {
          return 1;
        }
        return 0;
      },
      sortUndefined: -1
    },
    {
      accessorKey: "year",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Year" />
      ),
      cell: ({ row }) => {
        const year = years.find(
          (year) => year.value === row.getValue("year")
        )

        if (!year) {
          return null
        }

        return (
          <div className="flex w-[100px] items-center">
            <span>{year.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "signup_time",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Join Time" />
      ),
      cell: ({ row }) => (
        <div className="w-[100px]">{
          parseISO(row.getValue("signup_time"))
            .toLocaleString('en-US',
              { month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true }
            )}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
      sortingFn: (rowA, rowB) => {
        const timeA = parseISO(rowA.getValue("avgRating"));
        const timeB = parseISO(rowB.getValue("avgRating"));
        if (timeA < timeB) {
          return -1;
        }
        if (timeA > timeB) {
          return 1;
        }
        return 0;
      },
      sortUndefined: -1,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },

    }
  ] as ColumnDef<any>[])
  return feedbackFocus || (widthSize && widthSize < breakWidth) ? columns.slice(1, 3) : columns
}
