export function containsEmoji(string: string): boolean {
    const emojiRegex = /\p{Extended_Pictographic}/u;
    return emojiRegex.test(string);
}