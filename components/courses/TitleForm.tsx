"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Pencil } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleFormProps {
    initialData: {
        title: string;
    }
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    })
});

export const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.patch(`/api/courses/${courseId}`, values);
                toast.success("Course title updated successfully.");
                toggleEditing();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong while updating the title, please try again.")
            }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Course title
                <Button variant="ghost" onClick={toggleEditing}>
                    {isEditing ? (
                        <span className="text-slate-600">Cancel</span>
                    ): (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            <span className="text-slate-600">Edit title</span>
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing ? (
                <p className="text-sm mt-2">{initialData.title}</p>
            ) : (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g Introduction to React"
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