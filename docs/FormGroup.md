## <FormGroup \/> Component
This component is wrapper for input/textarea/select and hint/label.  
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form\/>](./Form.md)  
[Props](../src/FormGroup/FormGroupProps.ts)


Example
```typescript jsx
import {FormGroup, Input, Label, Hint} from "react-context-form";

export function CustomGroup() {
    return (
        <FormGroup name="name">
            <Label>Who will done this</Label>
            <Input maxLength={10} placeholder="Worker" required/>
        </FormGroup>
    );  
};
```

It will render
```html
<div class="form-group">
    <label for="rcf-20170403">Who will done this</label>
    <input maxlength="10" placeholder="Worker" name="name" id="rcf-20170403"/>
</div>
```