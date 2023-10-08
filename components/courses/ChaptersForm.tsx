"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Chapter, Course } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Loader2, Pencil, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChapterLists } from "@/components/courses/chapters/ChapterLists";

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1),
});

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const router = useRouter();

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.post(`/api/courses/${courseId}/chapters`, values);
                toast.success("Course Chapter created successfully.");
                toggleCreating();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong while updating the chapters, please try again.")
            }
    };

    const onReorder = async (updateData: {id: string; position: number}[]) => {
        try {
            setIsUpdating(true);

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            });
            toast.success("Course Chapters reordered successfully.");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong while reordering the chapters, please try again.");
        } finally {
            setIsUpdating(false);
        }
    };

    const onEditList = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };
    
    return ( 
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full flex items-center justify-center bg-slate-500/20 top-0 right-0 rounded-md">
                    <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
                </div>
            )}
            <div className="flex items-center justify-between font-medium">
                Course Chapters
                <Button variant="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <span className="text-slate-600">Cancel</span>
                    ): (
                        <>
                            <UploadCloud className="w-4 h-4 mr-2" />
                            <span className="text-slate-600">Add a chapter</span>
                        </>
                    )}
                    
                </Button>
            </div>
            {isCreating && (
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
                                            placeholder="e.g. Chapter 1: Introduction to the course."
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button disabled={!isValid || isSubmitting} type="submit">Create</Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn("text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && (
                        "You haven't added any chapters yet."
                    )}
                    <ChapterLists
                        onEdit={onEditList}
                        onReorder={onReorder}   
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-sm text-muted-foreground mt-4">
                    Drag and drop to reorder chapters.
                </p>
            )}
        </div>
    );
}