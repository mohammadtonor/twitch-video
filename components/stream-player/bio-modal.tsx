'use client';

import { toast } from "sonner";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";

import { 
    Dialog,
    DialogHeader,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface BioModalProps {
    initialValue: string | null;
}

export const BioModal = ({
    initialValue
}: BioModalProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    const [isPending, startTransaction] =  useTransition();
    const [value, setValue] = useState(initialValue || "");

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)  
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransaction(() => {
            updateUser({ bio:value })
              .then((data) => {
                toast.success(`updated ${data.userName}'s bio`);
                closeRef.current?.click();
              })  
              .catch((err) => toast.error('Somthing went wrong'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='link' size='sm'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit user bio
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea 
                        disabled={isPending}
                        placeholder="Please enter your bio"
                        value={value}  
                        onChange={onChange}
                    />
                    <div className="flex items-center justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button
                              type="button"
                              variant='ghost'
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button 
                           disabled={isPending}
                           type="submit"
                           className="h-auto w-auto" 
                           variant='primary'>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}