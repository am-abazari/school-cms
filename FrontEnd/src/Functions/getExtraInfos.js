import axios from "axios";
import Cookies from "universal-cookie";
import BaseURL from "../BaseURL";
import infToField from '../Functions/intToField';
import intToGrade from '../Functions/intToGrade';

const getExtraInfos = async (id) => {
    const cookies = new Cookies();
    const request = await axios.post(BaseURL + "cms-backend/extraInfos.php", { user_id: id })
    let grade, userClass, groups, must_study, field;
    try {
        if (request.data.resp == "200") {

            // Must Study
            must_study = (request.data.must_study);
            // "Grade"
            grade = (intToGrade(request.data.grade));
            // Class
            if (request.data.class != "0") {
                userClass = (request.data.class);
            } else {
                userClass = ("نامعتبر");
            }
            // Groups
            if (request.data.groups != "0") {
                groups = (request.data.groups);
            } else {
                groups = ("نامعتبر");
            }
            // field
            field = (infToField(request.data.field));
            return {
                grade: grade,
                class: userClass,
                groups: groups,
                must_study: must_study,
                field: field
            }
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


export default getExtraInfos;