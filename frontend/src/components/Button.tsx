interface ButtonProps {
    variant: 'primary' | 'secondary';
    size:'sm'|'md'|'lg';
    text:string;
    startIcon ?:React.ReactNode;
    endIcon ?:React.ReactNode;
    onClick?:(event: React.MouseEvent<HTMLButtonElement>)=>void;
    fullwidth?:boolean;
    loading?:boolean;
}
const ButtonVariants={
    primary:"bg-purple-600 text-white",
    secondary:"bg-purple-300 text-purple-600"
}

const SizeStyles={
sm:"py-1 px-2 text-sm rounded-sm",
md:"py-2 px-4 text-base rounded-md",
lg:"py-4 px-6 text-lg rounded-lg"
}

const defaultstyles="flex items-center justify-center gap-2"

export const  Button=(props:ButtonProps)=>{


    return(
        <button onClick={props.onClick} className={`${ButtonVariants[props.variant]}
         ${SizeStyles[props.size]}
       ${defaultstyles} ${props.fullwidth?' w-full flex justify-center items-center':''} ${props.loading?'opacity-50 cursor-not-allowed':''}`}>
         {props.startIcon?<div>{props.startIcon}</div>:null}  <div> {props.text}</div>  {props.endIcon?<div>{props.endIcon}</div>:null}
            </button>
    )
}
