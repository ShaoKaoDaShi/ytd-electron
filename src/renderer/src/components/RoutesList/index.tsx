
import { BrowserRouter, Route, Routes } from "react-router";

import Settings from "@renderer/pages/Settings";
import Download from "@renderer/pages/Download";    

export const RoutesList = () => {
    return <Routes>
        
        <Route path="/download" element={<Download/>} />
        <Route path="/settings" element={<Settings/>} />
    </Routes>
}

