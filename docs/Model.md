# Model Class
This class is representation of your forms data.
It also contains validation rules.

Implemented interface can be founded [here](../src/Model.ts).
  
[class-validator](https://github.com/pleerock/class-validator) is used for setting validation rules.

### Usage

```ts
import {Model, ModelGroups} from "react-context-form";
import {IsBoolean, IsNotEmpty, IsString, Length, MaxLength, MinLength} from "class-validator";

export const TaskPersonalNameMinLength = 3;
export const TaskPersonalNameMaxLength = 10;

export const TaskTextMinLength = 10;

export class TaskModel extends Model {
    @IsString()
    @IsNotEmpty()
    @Length(TaskPersonalNameMinLength, TaskPersonalNameMaxLength, {
        groups: ["name"],
    })
    public name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(TaskTextMinLength)
    public text: string;

    @IsBoolean()
    public completed: boolean = false;

    public attributes(): string[] {
        return ["name", "text", "completed"];
    }

    public groups(): ModelGroups {
        return {
            name: ["name"],
        };
    }
}
```

*NOTE: You need to specify attributes list for correct empty fields validation*  
*NOTE: You need to specify attributes groups to correct work of `AutoValidate` component*

You can also specify default values:

```ts
const model = new TaskModel({
    name: "default name",
    completed: true
});
```

Model instance can be reseted to defaults or cleared:

```ts
model.reset(); // Fills fields with default values
model.clear(); // Clear all fields
```
