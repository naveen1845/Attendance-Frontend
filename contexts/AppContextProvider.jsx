import combineContexts from "@/utils/combineContexts";
import  { AuthContextProvider } from "./AuthContext";

export const AppContextProvider = combineContexts(AuthContextProvider);