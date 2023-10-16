"use client";

import { IconType } from "react-icons";
import { Category } from "@prisma/client";

import { BiCodeCurly, BiSolidCamera } from "react-icons/bi";
import { FcEngineering, FcFilmReel } from "react-icons/fc";
import { GrTechnology } from "react-icons/gr";
import { TbEyeEdit } from "react-icons/tb";

import { CategoryItems } from "@/components/search/CategoryItems";
interface CategoriesProps {
    items: Category[];
};

const iconMap: Record<Category["name"], IconType> =
{
    "Computer Science": BiCodeCurly,
    "Software Engineering": FcEngineering,
    "Information Technology": GrTechnology,
    "Animation & 3D Animation": TbEyeEdit,
    "Photography": BiSolidCamera,
    "Filming": FcFilmReel,
};

export const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItems 
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
};