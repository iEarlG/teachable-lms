
import { SidebarLogo } from "@/components/navigations/sidebar/SidebarLogo";
import { SidebarRoutes } from "@/components/navigations/sidebar/SidebarRoutes";

export const Sidebar = () => {
    return (
        <div className="h-full flex flex-col border-r overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <SidebarLogo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    )
};  