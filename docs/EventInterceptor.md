# <EventInterceptor /> Component
This component is responsible for catching events in [<Form/>](./Form.md).
It requires [context](../src/Form/FormContext.ts) which is provided by [<Form/>](./Form.md)  

### Usage

```tsx
<Form {...FormProps}>
    <EventInterceptor 
        events={[Event.onChange, Event.onFocus, Event.onBlur]}
        onBlur={(attribute: string, value: string) => console.log(attribute, value)}
        onFocus={(attribute: string, value: string) => console.log(attribute, value)}
        onFocus={(attribute: string, value: string) => console.log(attribute, value)}
        onChange={(attribute: string, nextValue: string, prevValue: string) => console.log(attribute, nextValue, prevValue)}
    >
        // ...
    </EventInterceptor>
</Form>
```

where:
- `events` - list of catching events. Required.
- `onBlur` - callback, that triggered when some input is submit `blur` event. Optional.
- `onFocus` - callback, that triggered when some input is submit `focus` event. Optional.
- `onChange` - callback, that triggered when some input is submit `change` event. Optional.
