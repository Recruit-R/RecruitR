"use client"

import {Cross2Icon, DownloadIcon} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { DataTableViewOptions } from "./data-table-view-options.tsx";

import { DataTableFacetedFilter } from "./data-table-faceted-filter.tsx"
import { years } from "@/app/recruit/home/data/student-data.tsx";
import {downloadxls} from "@/lib/utils.ts";
import {Student} from "@/app/recruit/home/data/student-schema.ts";

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
          {
              table.getColumn("last_name")?.setFilterValue(event.target.value)
              table.resetPageIndex()
          }

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
        <div className={"px-1"}>
            <Button
                variant={"outline"}
                className={"p-2 h-8"}
                // disabled={table.getSelectedRowModel().rows.length === 0}
                onClick={e => {
                    let data;
                    if (table.getSelectedRowModel().rows.length === 0) {
                        data = table.getExpandedRowModel().rows.map(row => JSON.parse(JSON.stringify(row.original as Student)))

                    }
                    else {
                        data = table.getSelectedRowModel().rows.map(row => JSON.parse(JSON.stringify(row.original as Student)))

                    }
                    downloadxls(e, data)
            }}
            >
                <DownloadIcon className={"h-4 w-4"}/>
                <span className={c("ml-2 hidden", "md:block", false)}>
                    Download
                </span>


            </Button>
        </div>
      <div className={c("hidden", "md:block", false)}>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
