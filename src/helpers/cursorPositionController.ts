export function cursorPositionController(element: HTMLInputElement, action: () => any): void {
    let initialCursorPosition;

    if ((typeof element.setSelectionRange).toLowerCase() === "function") {
        initialCursorPosition = element.selectionStart;
    }

    action();

    if (initialCursorPosition !== undefined) {
        element.setSelectionRange(element.value.length, initialCursorPosition);
    }
}
