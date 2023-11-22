"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, years } from "../data/student-data"
import { Task } from "../../../tasks/data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import useScreenWidth from "@/hooks/use-screen-width";

export const studentColumns = (feedbackFocus): ColumnDef<Task>[] => {
  const widthSize = useScreenWidth()
  const breakWidth = 768
  const columns = ([
    {
      id: "select",
      header: ({table}) => (
          <Checkbox
              checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
              className="translate-y-[2px]"
          />
      ),
      cell: ({row}) => (
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
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="First Name"/>
      ),
      cell: ({row}) => <div className="w-1/2 md:w-[40px]">{row.getValue("first_name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "last_name",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Last Name"/>
      ),
      cell: ({row}) => <div className="w-1/2 md:w-[40px]">{row.getValue("last_name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "university",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="University"/>
      ),
      cell: ({row}) => <div className="w-[80px]">{row.getValue("university")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "gpa",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="GPA"/>
      ),
      cell: ({row}) => <div className="w-[80px]">{row.getValue("gpa")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    // {
    //   accessorKey: "title",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Title" />
    //   ),
    //   cell: ({ row }) => {
    //     const label = labels.find((label) => label.value === row.original.label)
    //
    //     return (
    //       <div className="flex space-x-2">
    //         {label && <Badge variant="outline">{label.label}</Badge>}
    //         <span className="max-w-[500px] truncate font-medium">
    //           {row.getValue("title")}
    //         </span>
    //       </div>
    //     )
    //   },
    // },
    {
      accessorKey: "year",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Year"/>
      ),
      cell: ({row}) => {
        const year = years.find(
            (year) => year.value === row.getValue("year")
        )

        if (!year) {
          return null
        }

        return (
            <div className="flex w-[100px] items-center">
              {/*{status.icon && (*/}
              {/*  <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />*/}
              {/*)}*/}
              <span>{year.label}</span>
            </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    // {
    //   accessorKey: "priority",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Priority" />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = priorities.find(
    //       (priority) => priority.value === row.getValue("priority")
    //     )
    //
    //     if (!priority) {
    //       return null
    //     }
    //
    //     return (
    //       <div className="flex items-center">
    //         {priority.icon && (
    //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //         )}
    //         <span>{priority.label}</span>
    //       </div>
    //     )
    //   },
    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id))
    //   },
    // },
    // {
    //   id: "actions",
    //   cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
  ] as ColumnDef<Task>[])
  return feedbackFocus || (widthSize < breakWidth)  ? columns.slice(1,3) : columns
}
