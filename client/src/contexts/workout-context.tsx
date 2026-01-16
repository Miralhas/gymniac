'use client'

import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { createContext } from "./create-context";

type WorkoutState = {
  open: boolean;
}

type WorkoutAction = {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const { ContextProvider, useContext } = createContext<WorkoutState & WorkoutAction>();

export const WorkoutProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ContextProvider value={{ open, setOpen }}>
      {children}
    </ContextProvider>
  )
}

export const useWorkoutContext = useContext;