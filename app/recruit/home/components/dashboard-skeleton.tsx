const DashboardSkeleton = () => {
    return (
        <div className="flex flex-row h-full relative">

            <div className={cn("h-full w-full bg-background p-1", studentView ? "max-md:hidden" : "", feedbackFocus ? "md:w-2/5 xl:w-1/4" : "md:w-3/5")}>
                <DataTable
                    setCurrentStudent={changeCurrentStudent}
                    setStudentView={setStudentView}
                    data={studentList ? Object.values(studentList) : []}
                    columns={StudentColumns(feedbackFocus)}
                    c={c}
                    setPage={setTablePage}
                />
            </div>

            <div className="self-center">
                <Button
                    variant="outline"
                    className="max-md:hidden px-1 py-1"
                    onClick={() => setFeedbackFocus(prevState => !prevState)}>

                    {feedbackFocus ?
                        <ChevronRightIcon className="w-4" />
                        : <ChevronLeftIcon className="w-4" />}
                </Button>
            </div>

            {
                currentStudent
                    ?
                    feedbackComponent()
                    :
                    noStudentViewComponent()
            }
            <SaveStatus />
        </div>
    )
}

export default DashboardSkeleton