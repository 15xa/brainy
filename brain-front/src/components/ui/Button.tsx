import { ReactElement } from "react";

interface ButtonInterface {
    title: string,
    size: "lg" | "md" | "sm",
    startIcon? : ReactElement,
    endIcon? : ReactElement,
    variant: "primary" | "secondary"
} 

const sizeStyles : Record<ButtonInterface["size"], string> = {
    "sm": "p-1 px-2",
    "md": "p-2 px-4",
    "lg": "p-3 px-6",
}

const variantStyles : Record<ButtonInterface["variant"], string> = {
    "primary": "bg-blue-300 text-white",
    "secondary": "bg-white border border-blue-300 text-blue-300"
}


export const Button = (props: ButtonInterface) => {
    return <button className={`${sizeStyles[props.size]} ${variantStyles[props.variant]} rounded-xl flex`}>
        {props.startIcon ? <div className="mr-1">{props.startIcon}</div> : null} 
{props.title} 
        {props.endIcon ? <div className="mr-1">{props.endIcon}</div> : null} 

</button>
}