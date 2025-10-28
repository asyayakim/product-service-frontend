type TextFieldProps = {
    label: string;
    [key: string]: any;
};
export default function TextField({ label, ...props }: TextFieldProps) {
    return (  <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">{label}</h2>
            <p className="text-gray-700">{props.children}</p>
    </div>);
}