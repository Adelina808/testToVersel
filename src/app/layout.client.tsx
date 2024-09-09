'use client'
import ReduxProvider from "@/providers/ReduxProvider";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface LayoutClientProps {
    children: ReactNode;
}
const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
    return(
      <ReduxProvider>{children}</ReduxProvider>
    )
};

export default LayoutClient;
