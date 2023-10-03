"use client";

import axios from "axios";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormDescription, FormLabel, FormField, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Please enter a course title"
    }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });
    const {isSubmitting, isValid} = form.formState; 

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Your course has been created successfully!");
        } catch (error) {
            toast.error("Something went wrong while creating your course. Please try again.");
        }
    };

    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">Name your course</h1>
                <p className="text-sm text-slate-600">Any cool course name in mind? Don&apos;t worry, you can always change it later.</p>
                <Form {...form}>
                    <form
                        className="space-y-8 mt-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="e.g Introduction to Computer Science"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What is the knowledge you want to share with your students about this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button variant="ghost" type="button">Cancel</Button>
                            </Link>
                            <Button variant="default" type="submit" disabled={!isValid || isSubmitting}>Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
 
export default CreatePage;