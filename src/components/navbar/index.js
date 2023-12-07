import { Link } from "react-router-dom";
import { useTranslation } from "../../store/use-translation";
import "./style.css"

function Navbar() {
    const t = useTranslation();
    
    return <Link to='/' className="Navbar">{t('main')}</Link>
}

export default Navbar