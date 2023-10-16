"use client";

import { Category } from "@prisma/client";

interface CategoriesProps {
    items: Category[];
};

export const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div>
            Categories
        </div>
    )
};