"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/priceformat";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
};

export const CourseEnrollButton = ({ 
    courseId, price 
}: CourseEnrollButtonProps) => {
    return (
        <Button size="sm" className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    )
};