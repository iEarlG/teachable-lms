"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Course } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: {
        label: string;
        value: string;
    }[];
};

const formSchema = z.object({
    categoryId: z.string().min(1),
});

export const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.patch(`/api/courses/${courseId}`, values);
                toast.success("Course category updated successfully.");
                toggleEditing();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong while updating the category, please try again.")
            }
    };

    const selectedOptions = options.find((option) => option.value === initialData.categoryId);
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Course Category
                <Button variant="ghost" onClick={toggleEditing}>
                    {isEditing ? (
                        <span className="text-slate-600">Cancel</span>
                    ): (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            <span className="text-slate-600">Edit Category</span>
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic"
                )}>
                    {selectedOptions?.label || "No category provided."}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox 
                                            options={options}
                                            {...field}
                                        />    
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit">Save</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}