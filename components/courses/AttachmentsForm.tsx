"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { ImageIcon, ImagePlus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";

interface AttachmentsFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image or Video is required"
    })
});

export const AttachmentsForm = ({
    initialData,
    courseId
}: AttachmentsFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                await axios.patch(`/api/courses/${courseId}`, values);
                toast.success("Course resources & attachments updated successfully.");
                toggleEditing();
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong while updating the resources & attachments, please try again.")
            }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="flex items-center justify-between font-medium">
                Course Attachments
                <Button variant="ghost" onClick={toggleEditing}>
                    {isEditing && (
                        <>
                            <span className="text-slate-600">Cancel</span>
                        </>
                    )}
                    {!isEditing && (
                        <>
                            <ImagePlus className="h-4 w-4 mr-2" />
                            <span className="text-slate-600">Add a File</span>
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image 
                            src={initialData.imageUrl}
                            alt="Course Image Upload"
                            className="object-cover rounded-md"
                            fill
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUploader 
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({imageUrl: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
}