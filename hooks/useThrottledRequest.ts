import React, { useEffect, useRef, useMemo } from 'react';
import throttle from 'lodash/throttle';
import _ from "lodash";
import {addFeedback} from "@/app/recruit/home/actions.ts";
import {useThrottle} from "@/hooks/useThrottle.ts";
import {Student} from "@/app/recruit/home/data/student-schema.ts";
import {StudentDataContextType} from "@/app/recruit/home/components/dashboard.tsx";

type Callback = () => void;
export const useThrottledRequest = (
    {
        studentContext,
        dbData,
        localData,
        dependency
        }:
        {
            studentContext: StudentDataContextType,
            dbData: any,
            localData: any,
            dependency: any
        }): void => {

    const throttledRequest =  useThrottle(() => {
        // send request to the backend
        // access to latest state here
        if (studentContext.editable()) {
            const mergedObject = _.merge(
                {},
                studentContext.currentStudent!.feedback,
                {[studentContext.currentUserEditId]: localData});

            addFeedback(studentContext.currentStudent!.id,
                JSON.stringify(dbData),
                studentContext.currentUserEditId).then(e => (studentContext.setSaved(true)))

            studentContext.setCurrentStudent((prevState: any) => ({...prevState, feedback: mergedObject}))
        }
    })
    useEffect(() => {
        studentContext.setSaved(false)
        throttledRequest();
    }, [dependency]);

}