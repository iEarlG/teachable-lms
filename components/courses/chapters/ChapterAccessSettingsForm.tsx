"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Chapter } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessSettingsFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    isFree: z.boolean().default(false),
});

export const ChapterAccessSettingsForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAccessSettingsFormProps) => { 
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: Boolean(initialData.isFree),
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
                toast.success("Chapter access settings updated successfully.");
                toggleEditing();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong. Please try again.")
            }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Chapter Settings
                <Button variant="ghost" onClick={toggleEditing}>
                    {isEditing ? (
                        <span className="text-slate-600">Cancel</span>
                    ): (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            <span className="text-slate-600">Edit Access</span>
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                   {initialData?.isFree ? (
                    <>
                        This chapter is free for preview.
                    </>
                   ): (
                    <>
                        This chapter is not free for preview.
                    </>
                   )}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>Check this box if you want this specific chapter to be free for preview.</FormDescription>
                                    </div>
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