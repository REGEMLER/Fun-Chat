export function validateLetters(value: string): boolean {
    const reg = /[a-zA-Z-]/;
    let result = true;
    const arr: string[] = value.split('');
    arr.forEach((item) => {
        if (!reg.test(item)) result = false;
    });
    return result;
}

export function validateLength(value: string, length: number): boolean {
    return value.length >= length;
}
