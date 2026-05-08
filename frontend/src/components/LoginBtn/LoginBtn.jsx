import { useLanguage } from "../../context/LanguageContext"
import { Link } from "react-router-dom";

const LoginBtn = () => {
    const { textos } = useLanguage()
    const LoginBtnStyles = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:bg-[position:right_center] text-white tracking-wider px-3 py-1 rounded-md font-semibold transition-all duration-500 ease-in-out inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5";


    return (
        <Link
            to={"/auth/login"}
            className={`${LoginBtnStyles}`}>
            {textos.navbar?.login}
        </Link>
    )
}

export default LoginBtn