const infToField = (data) => {
    if (data == "1") {
        return("ریاضی");
    } else if (data == "2") {
        return("تجربی");
    } else if (data == "3") {
        return('انسانی');
    } else if (data == "4") {
        return("هنر");
    } else {
        return("نامعتبر");
    }
}

export default infToField;