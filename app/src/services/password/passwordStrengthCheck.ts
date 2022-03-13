enum States {
    veryWeak = 'red',
    weak = 'orange',
    normal = 'blue',
    strong = 'green'
}

type PasswordDetails = {
    strength: number; // 1 - 100
    state: States;
}

export default function passwordStrengthCheck(password: string): PasswordDetails {

    const letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const numbers: string[] = ['0','1','2','3','4','5','6','7','8','9'];

    let score: number = 0;

    // 3 length points
    if(password.length > 5) score++;
    if(password.length > 9) score++;

    // 2 number points
    const numbersCount: number = count(password, numbers);
    if(numbersCount > 1) score++;
    if(numbersCount > 2) score++;

    // 2 capital points
    const capitalCount: number = count(password, letters.map((l) => l.toUpperCase()));
    if(capitalCount > 1) score++;
    if(capitalCount > 3) score++;

    // 2 lower points
    const lowerCount: number = count(password, letters);
    if(lowerCount > 1) score++;
    if(lowerCount > 3) score++;

    // 9 special points
    const specialCount: number = password.toLowerCase().split('').filter((c) => !numbers.includes(c) && !letters.includes(c)).length;
    if(specialCount > 1) score += 2;
    if(specialCount > 2) score++;
    if(specialCount > 4) score += 2;
    if(specialCount > 6) score += 2;
    if(specialCount > 8) score += 2;

    const percent = (score * 100) / 17;

    return {
        strength: percent,
        state: (
            percent < 25 ? States.veryWeak :
            percent < 50 ? States.weak :
            percent < 75 ? States.normal :
            States.strong
        ),
    };

    function count(text: string, chars: string[]): number {
        let c: number = 0;
        for(const ch of text) {
            if(ch in chars) c++;
        }
        return c;
    }
}