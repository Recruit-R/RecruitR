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
      cell: ({ row }) => <div className="w-1/2 md:w-[100px] truncate">{row.getValue("last_name")}</div>,
      enableSorting: true,
      enableHiding: false,

    },
    {
      accessorKey: "university",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="University" />
      ),
      cell: ({ row }) => <div className="w-[150px] truncate">{row.getValue("university")}</div>,
      enableSorting: true,
      enableHiding: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      accessorKey: "gpa",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GPA" />
      ),
      cell: ({ row }) => <div className="w-[40px]">{!row.getValue("gpa") ? "-" : row.getValue("gpa")}</div>,
      enableSorting: true,
      enableHiding: true,
      sortUndefined: -1
    },
    {
      accessorKey: "avgRating",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Avg. Rating" />
      ),
      cell: ({ row }) => <div className="w-[40px]">
        {isNaN(parseFloat(row.getValue("avgRating"))) ? "-" :
            (Math.round(parseFloat(row.getValue("avgRating")) * 100) / 100).toFixed(2)}

      </div>,
      enableSorting: true,
      enableHiding: true,
      sortingFn: (rowA, rowB) => {
        const ratingA = rowA.getValue("avgRating")
            ? isNaN(parseFloat(rowA.getValue("avgRating")))
                ? null
                : parseFloat(rowA.getValue("avgRating"))
            : null;
        const ratingB = rowB.getValue("avgRating")
            ? isNaN(parseFloat(rowB.getValue("avgRating")))
                ? null
                : parseFloat(rowB.getValue("avgRating"))
            : null;

        if (!ratingA && !ratingB) {
          return 0
        }
        if (!ratingA) {
          return -1
        }
        if (!ratingB){
          return 1
        }
        if ((ratingA < ratingB) ) {
          return -1;
        }
        if (ratingA > ratingB) {
          return 1;
        }
        return 0;
      },
      sortUndefined: false
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
      enableHiding: true,
      sortingFn: (rowA, rowB) => {
        const timeA = parseISO(rowA.getValue("signup_time"));
        const timeB = parseISO(rowB.getValue("signup_time"));
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
  return columns
}
