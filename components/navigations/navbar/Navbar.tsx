import { MobileSidebar } from "@/components/navigations/navbar/MobileSidebar";
import { NavbarRoutes } from "@/components/navigations/navbar/NavbarRoutes";

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
};