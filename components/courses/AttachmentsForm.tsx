"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import toast from "react-hot-toast";
import * as z from "zod";
import axios from "axios";

import { File, ImageIcon, ImagePlus, Loader2, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";

interface AttachmentsFormProps {
    initialData: Course  & {
        attachments: Attachment[]
    };
    courseId: string;
};

const formSchema = z.object({
    url: z.string().min(1),
});

export const AttachmentsForm = ({
    initialData,
    courseId
}: AttachmentsFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    const toggleEditing = () => {
        setIsEditing((current) => !current)
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course resources & attachments updated successfully.");
            toggleEditing();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong while updating the resources & attachments, please try again.")
        }
    };

    const onDelete = async (id: string) => {
        try {
            setIsDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Resource deleted successfully.");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong while deleting the resource, please try again.")
        } finally {
            setIsDeletingId(null);
        }
    }
    
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
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">No attachments found.</p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center w-full p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-sm line-clamp-1">{attachment.name}</p>
                                    {isDeletingId === attachment.id && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {isDeletingId !== attachment.id && (
                                        <button className="ml-auto hover:opacity-75 transition" onClick={() => onDelete(attachment.id)}>
                                            <X className="h-4 w-4 animate-spin" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <FileUploader 
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({url: url});
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Add resources and attachments to your course. That is anything that you want to share with your students, such as PDFs, video, etc.
                    </div>
                </div>
            )}
        </div>
    );
}