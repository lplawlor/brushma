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
            color="primary"
            className="mt-6 p-7 text-lg md:text-xl lg:text-2xl font-bold"
            {...props}
        >
            {children}
        </Button>
    );
}