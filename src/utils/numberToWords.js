// Enhanced numberToWords.js with currency and fraction support

export const convertToWordsEn = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (typeof num !== "number") return "";
    if (num === 0) return "Zero Riyals";

    const toWords = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + toWords(n % 100) : "");
        if (n < 1_000_000) return toWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + toWords(n % 1000) : "");
        if (n < 1_000_000_000) return toWords(Math.floor(n / 1_000_000)) + " Million" + (n % 1_000_000 !== 0 ? " " + toWords(n % 1_000_000) : "");
        return "Too Large";
    };

    const integerPart = Math.floor(num);
    const fractionPart = Math.round((num - integerPart) * 100);

    const riyals = toWords(integerPart) + " Riyal" + (integerPart !== 1 ? "s" : "");
    const halalas = fractionPart > 0 ? " and " + toWords(fractionPart) + " Halala Only" + (fractionPart !== 1 ? "s" : "") : "";

    return riyals + halalas;
};

export const convertToWordsAr = (num) => {
    const ones = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
    const teens = ["عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
    const tens = ["", "", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
    const hundreds = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];

    if (typeof num !== "number") return "";
    if (num === 0) return "صفر ريال";

    const toWords = (n) => {
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) {
            const ten = Math.floor(n / 10);
            const unit = n % 10;
            if (unit === 0) return tens[ten];
            return ones[unit] + " و" + tens[ten];
        }
        if (n < 1000) {
            const hundred = Math.floor(n / 100);
            const rest = n % 100;
            return hundreds[hundred] + (rest > 0 ? " و" + toWords(rest) : "");
        }
        if (n < 1_000_000) {
            const thousands = Math.floor(n / 1000);
            const rest = n % 1000;
            let thousandWord = "";
            if (thousands === 1) thousandWord = "ألف";
            else if (thousands === 2) thousandWord = "ألفان";
            else if (thousands >= 3 && thousands <= 10) thousandWord = toWords(thousands) + " آلاف";
            else thousandWord = toWords(thousands) + " ألف";
            return thousandWord + (rest !== 0 ? " و" + toWords(rest) : "");
        }
        if (n < 1_000_000_000) {
            const millions = Math.floor(n / 1_000_000);
            const rest = n % 1_000_000;
            let millionWord = "";
            if (millions === 1) millionWord = "مليون";
            else if (millions === 2) millionWord = "مليونان";
            else if (millions >= 3 && millions <= 10) millionWord = toWords(millions) + " ملايين";
            else millionWord = toWords(millions) + " مليون";
            return millionWord + (rest !== 0 ? " و" + toWords(rest) : "");
        }
        return "عدد كبير جداً";
    };

    const integerPart = Math.floor(num);
    const fractionPart = Math.round((num - integerPart) * 100);

    const riyals = toWords(integerPart) + " ريال";
    const halalas = fractionPart > 0 ? " و" + toWords(fractionPart) + "  هللة فقط" : "";

    return riyals + halalas;
};
