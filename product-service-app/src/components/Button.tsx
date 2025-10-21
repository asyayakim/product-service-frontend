// type ButtonProps = {
//     name?: string;
//     type?: "button" | "submit" | "reset";
//     onClick: () => void;
//     className?: string;
//     label?: string;
// };
type ButtonProps = {
    name?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    label?: string;
    children?: React.ReactNode;
};

export default function Button({ name, type = "button", onClick, className, label, children }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={className} aria-label={label}>
            {children || name}
        </button>
    );
}