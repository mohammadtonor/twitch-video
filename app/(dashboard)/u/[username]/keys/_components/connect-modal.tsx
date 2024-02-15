'use client';

import { toast } from "sonner";
import { ElementRef, useRef, useState, useTransition } from "react";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";

import { createInggres  } from "@/actions/ingress";
import { 
    Alert,
    AlertDescription,
    AlertTitle
 } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogClose
 } from "@/components/ui/dialog";
import { 
    Select,
    SelectContent,
    SelectItem, 
    SelectTrigger, 
    SelectValue
 } from "@/components/ui/select";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    const [isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressType>(RTMP)

    const onSubmit = () => {
        startTransition(() => {
            createInggres(parseInt(ingressType))
             .then(() => {
                 toast.success('Ingress created')
                 closeRef.current?.click()
             })
             .catch((er) => toast.error('Somthinf went wrong.'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='primary'>
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Generate Connection
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder='Ingres Type'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4"/>
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant='ghost'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        disabled={isPending}
                        onClick={onSubmit}
                        variant='primary'>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}