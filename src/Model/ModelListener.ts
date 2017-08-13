export interface ModelListener {
    (): Promise<void> | void;
}