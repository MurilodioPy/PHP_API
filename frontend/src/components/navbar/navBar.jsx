import styles from './navbar.module.css';
import { MdEventAvailable } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItens}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/logo-girolando.png" alt="logo girolando" />
                </Link>
                <div className={styles.navbarMenu}>
                <Link  to={'/'}>
                        Eventos
                </Link>
                <Link to={'/add'}>
                        <MdEventAvailable/>
                        Novo Evento 
                </Link>
                        
                </div>
            </div>


            <div className={styles.mobileNavbar}>
                <Link to={'/'}>
                    <img className={styles.logo} src="../../../public/logo-girolando.png" alt="logo girolando" />
                </Link>
                <div className={styles.navbarMenu}>
                    <Link  to={'/'}>
                            Eventos
                    </Link>
                    <Link to={'/add'}>
                        <MdEventAvailable/>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

