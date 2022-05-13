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
    text = replacer(text, ['ì','í','ï','î','1'], 'i');
    text = replacer(text, ['ò','ó','ö','ô','0'], 'o');
    text = replacer(text, ['ù','ú','ü','û'], 'u');
    text = replacer(text, ['ñ'], 'n');
    text = replacer(text, ['ç'], 'c');
    text = replacer(text, ['¿','!','¡','|'], '?');
    text = replacer(text, ['\\'], '/');

    return text;
}

export function listFilter(values: string[], filter: string): boolean {

    for(const v of values) {
        if(decomposeString(v).includes(decomposeString(filter))) return true;
    }

    return false;
}