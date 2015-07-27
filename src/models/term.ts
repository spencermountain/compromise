class Term {
    text:string;
    normal:string;
    pos:string;
    constructor(text: string) {
      this.text = text;
      this.normal = text.toLowerCase();
    }
    syllables(): string[]{
        return ["a","e","u"]
    }
}
export = Term