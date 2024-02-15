"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { DataTableViewOptions } from "./data-table-view-options.tsx";

import { priorities, statuses } from "../../../tasks/data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter.tsx"
import {years} from "@/app/recruit/home/data/student-data.tsx";

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  c: (classnames: string, conditionalNames: string, condition?: boolean) => string
}

export function DataTableToolbar<TData>({
  table,
  c
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter students..."
          value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("last_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("year") && (
          <DataTableFacetedFilter
            column={table.getColumn("year")}
            title="Year"
            options={years}
          />
        )}
        {/*{table.getColumn("priority") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn("priority")}*/}
        {/*    title="Priority"*/}
        {/*    options={priorities}*/}
        {/*  />*/}
        {/*)}*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
        <div className={c("hidden", "md:block", false)}>
          <DataTableViewOptions table={table} />
        </div>
    </div>
  )
}
