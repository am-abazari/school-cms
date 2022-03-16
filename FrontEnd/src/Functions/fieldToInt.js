const fieldToInt = (data) => {
    if (data == "ریاضی") {
        return ("1");
    } else if (data == "تجربی") {
        return ("2");
    } else if (data == "انسانی") {
        return ('3');
    } else if (data == "هنر") {
        return ("4");
    } else {
        return ("0");
    }
}

export default fieldToInt;