export function replacer(origin: string, values: string[], by: string): string {
    let txt = origin;

    for(const v of values) {
        txt = txt.replaceAll(v, by);
    }

    return txt;
}

export function decomposeString(_text: string): string {
    let text = _text.toLowerCase();

    text = replacer(text, ['à','á','ä','â','4'], 'a');
    text = replacer(text, ['è','é','ë','ê','3'], 'e');

    return text;
}

export function listFilter(values: string[], filter: string): boolean {

    for(const v of values) {
        if(decomposeString(v).includes(decomposeString(filter))) return true;
    }

    return false;
}