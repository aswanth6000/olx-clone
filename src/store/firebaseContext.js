import { createContext, useState } from "react";

export const firebaseContext = createContext(null)
export const AuthContext = createContext(null)

export default function Context ({children}){
    const [userd, setUserd] = useState(null);
    return(
        <AuthContext.Provider value={{userd, setUserd}}>
            {children}
        </AuthContext.Provider>
    )
}