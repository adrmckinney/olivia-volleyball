interface ArrayObject {
    [key: string]: boolean | string;
}

export function hasOnlyOneFalseValue<T extends ArrayObject>(arr: T[], property: string) {
    let trueCount = 0;

    for (const obj of arr) {
        if (obj[property] === false) {
            trueCount++;
            if (trueCount > 1) {
                return false; // More than one false value found
            }
        }
    }

    return trueCount === 1; // Return true if exactly one false value found
}
