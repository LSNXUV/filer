/** base64编码，支持中文 */
export function encodeToBase64(str: string) {
    return btoa(
        new TextEncoder().encode(str).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

/** base64解码，支持中文 */
export function decodeFromBase64(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}
