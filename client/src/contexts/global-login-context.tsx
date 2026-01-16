'use client'

import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { createContext } from "./create-context";

type GlobalLoginState = {
  open: boolean;
}

type GlobalLoginAction = {
  handleOpen: () => void;
  close: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const { ContextProvider, useContext } = createContext<GlobalLoginState & GlobalLoginAction>();

export const GlobalLoginProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <ContextProvider value={{ open, handleOpen, close, setOpen }}>
      {children}
    </ContextProvider>
  )
}

export const useGlobalLoginContext = useContext;