import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let theme;
localStorage.getItem("theme") == "dark" ?
    theme = "dark"
    :
    theme = "light";

const Toastify_Success = (content) => toast.success(content, { theme: theme });
const Toastify_Error = (content) => toast.error(content, { theme: theme });
const Toastify_Info = (content) => toast.info(content, { theme: theme });

export { Toastify_Success, Toastify_Error, Toastify_Info };