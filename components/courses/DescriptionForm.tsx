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
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required"
    })
});

export const DescriptionForm = ({
    initialData,
    courseId
}: DescriptionFormProps) => {
    const router = useRouter();
    const [isEditting, setIsEditting] = useState(false);

    const toggleEditting = () => {
        setIsEditting((current) => !current)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.patch(`/api/courses/${courseId}`, values);
                toast.success("Course description updated successfully.");
                toggleEditting();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong while updating the description, please try again.")
            }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Course description
                <Button variant="ghost" onClick={toggleEditting}>
                    {isEditting ? (
                        <span className="text-slate-600">Cancel</span>
                    ): (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            <span className="text-slate-600">Edit description</span>
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditting ? (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description || "No description provided."}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="e.g This course will teach you how to build a fullstack application using Next.js and Prisma."
                                            {...field}
                                            disabled={isSubmitting}
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