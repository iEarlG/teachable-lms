
import Image from "next/image";

export const SidebarLogo = () => {
    return (
        <div>
            <Image 
                src="/teachable.svg"
                alt="Logo"
                width={200}
                height={150}
            />
        </div>
    )
};