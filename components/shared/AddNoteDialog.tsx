"use client";

import {
  CreateNoteSchema,
  createNoteSchema,
} from "@/lib/database/validation/note.validation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LoadingButton from "./LoadingButton";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { boolean } from "zod";

// interface AddNoteDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

const AddNoteDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (input: CreateNoteSchema) => {
    try {
      const response = await axios.post("/api/create-notes", {
        title: input.title,
        content: input.content,
      });

      if (response.status !== 201) {
        throw Error("Status code: " + response.status);
      }

      form.reset();
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <FaPlus className="mr-2" />
          Add Note
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Add Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Note content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
