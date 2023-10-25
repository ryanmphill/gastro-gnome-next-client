'use client'
import styles from "./NavBar.module.css"
import gastroLogo from "../../../public/assets/Chef_green.svg"
import { useRouter } from "next/navigation"
import { DropdownMenu } from "./DropdownMenu"

export const NavBar = () => {
    const router = useRouter()
    const currentUser = {id: 1}
    return (
        <ul className={styles["navbar"]}>
            <li id={styles["logoContainer"]}>
                <img className={styles["navbar__logo"]} src={gastroLogo.src} alt="Logo" onClick={() => router.push("/")}></img>
                <h2 id={styles["gastroTitle"]} onClick={() => router.push("/")}>Gastro Gnome</h2>
            </li>
            <li className={`${styles["navbar__item"]} ${styles["navbar__Title"]}`}>
                
            </li>
            <li className={`${styles["navbar__item"]} ${styles["navbar__menu"]}`}>
                <DropdownMenu currentUser={currentUser} />
            </li>
        </ul>
    )
}