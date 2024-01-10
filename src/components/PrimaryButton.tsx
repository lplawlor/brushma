/**
 * Extension of the NextUI button with some default styling and a loading-spinner.
 */
"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function PrimaryButton({ children, ...props }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            isLoading={pending}
            radius="full"
            variant="ghost"
            color="primary"
            className="mt-6 p-5 text-lg md:text-xl lg:text-2xl font-medium"
            {...props}
        >
            {children}
        </Button>
    );
}