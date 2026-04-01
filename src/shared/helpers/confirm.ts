export default function confirm(message: string, fn: () => void) {
    if (window.confirm(message)) {
        fn();
    }
}