"use client"

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/priceformat";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
};

export const CourseEnrollButton = ({ 
    courseId, price 
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onPay = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`/api/courses/${courseId}/checkout`);

            window.location.assign(response.data.url);
        } catch {
            toast.error("Something went wrong, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            size="sm" 
            className="w-full md:w-auto"
            disabled={isLoading}
            onClick={onPay}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
};