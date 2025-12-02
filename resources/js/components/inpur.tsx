import { Input } from './ui/input';
import { Label } from './ui/label';

export default function InputComponent({
    ...props
}: React.ComponentProps<'input'>) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={props.id}>
                {props.title}{' '}
                {props.required && <span className="text-red-500">*</span>}
            </Label>
            <Input {...props} />
        </div>
    );
}
