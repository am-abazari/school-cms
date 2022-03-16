const IsEnd = (data) => {
    const date = new Date();
    let hour = date.getHours();
    let minut = date.getMinutes();
    if (data[0] > hour) {
        return false;
    } else if (data[0] == hour && data[1] > minut) {
        return false;
    } else {
        return true;
    }
};



const IsStart = (data) => {
    const date = new Date();
    let hour = date.getHours();
    let minut = date.getMinutes();
    if (data[0] < hour) {
        return true;
    } else if (data[0] == hour && data[1] <= minut) {
        return true;
    } else {
        return false;
    }
};

export {IsStart , IsEnd};