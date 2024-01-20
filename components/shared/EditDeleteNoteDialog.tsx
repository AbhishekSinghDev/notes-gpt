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
import { NoteSchemaInterface } from "@/lib/database/models/note.model";

interface EditDeleteNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: NoteSchemaInterface;
}

const EditDeleteNoteDialog: React.FC<EditDeleteNoteDialogProps> = ({
  open,
  setOpen,
  noteToEdit,
}) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const onSubmit = async (input: CreateNoteSchema) => {
    try {
      const response = await axios.put("/api/update-notes", {
        title: input.title,
        content: input.content,
        id: noteToEdit?._id,
      });

      if (response.status !== 200) {
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

  const handleDeleteNote = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch("/api/delete-note", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit?._id,
        }),
      });

      if (response.status !== 200) {
        throw Error("Status code: " + response.status);
      }

      form.reset();
      router.refresh();
      setDeleteLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Edit / Delete Note</DialogTitle>
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

            <DialogFooter className="gap-1 sm:gap-0">
              {noteToEdit && (
                <LoadingButton
                  variant="destructive"
                  loading={deleteLoading}
                  disabled={form.formState.isSubmitting}
                  type="button"
                  onClick={handleDeleteNote}
                >
                  Delete note
                </LoadingButton>
              )}

              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={deleteLoading}
              >
                Update
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeleteNoteDialog;
