const gradeToInt = (data) => {
    // Grade
    if (data == "نامعتبر") {
        return ("0");
    } else if (data == "اول") {
        return ("1");
    } else if (data == "دوم") {
        return ("2");
    } else if (data == "سوم") {
        return ("3");
    } else if (data == "چهارم") {
        return ("4");
    } else if (data == "پنجم") {
        return ("5");
    } else if (data == "ششم") {
        return ("6");
    } else if (data == "هفتم") {
        return ("7");
    } else if (data == "هشتم") {
        return ("8");
    } else if (data == "نهم") {
        return ("9");
    } else if (data == "دهم") {
        return ("10");
    } else if (data == "یازدهم") {
        return ("11");
    } else if (data == "دوازدهم") {
        return ("12");
    } else {
        return ('0');
    }

}


export default gradeToInt;