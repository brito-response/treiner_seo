"use client";

import React from "react";

type ButtonGenericProps = { label: string; type?: "reset" | "submit" | "button"; } & React.ComponentProps<"button">;

export const ButtonGeneric: React.FC<ButtonGenericProps> = ({ label, type = "submit", className = "", ...props }) => {
    return (
        <button type={type}
            className={`inline-flex items-center justify-center rounded-3xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 ${className}`}
            {...props}>
            {label}
        </button>
    );
};