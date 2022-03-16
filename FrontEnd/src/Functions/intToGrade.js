const intToGrade = (data) => {
    // Grade
    if (data == "0") {
        return ("نامعتبر");
    } else if (data == "1") {
        return ("اول");
    } else if (data == "2") {
        return ("دوم");
    } else if (data == "3") {
        return ("سوم");
    } else if (data == "4") {
        return ("چهارم");
    } else if (data == "5") {
        return ("پنجم");
    } else if (data == "6") {
        return ("ششم");
    } else if (data == "7") {
        return ("هفتم");
    } else if (data == "8") {
        return ("هشتم");
    } else if (data == "9") {
        return ("نهم");
    } else if (data == "10") {
        return ("دهم");
    } else if (data == "11") {
        return ("یازدهم");
    } else if (data == "12") {
        return ("دوازدهم");
    } else {
        return ('نامعتبر');
    }
}

export default intToGrade;