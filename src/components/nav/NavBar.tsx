import gastroLogo from "../../../public/assets/Chef_green.svg"
import { DropdownMenu } from "./DropdownMenu"
import Link from "next/link"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import styles from "./NavBar.module.css"

export const NavBar = async () => {
    const currentUserId = await getCurrentUserId()
    return (
        <header>
            <nav>
                <ul className={styles["navbar"]}>
                    <li id={styles["logoContainer"]}>
                        <Link href={"/"} className={styles["link_img_wrapper"]}>
                            <img className={styles["navbar__logo"]} src={gastroLogo.src} alt="Logo"></img>
                        </Link>
                        <Link href={"/"} className={styles["link_title_wrapper"]}>
                            <h2 id={styles["gastroTitle"]}>Gastro Gnome</h2>
                        </Link>
                    </li>
                    <li className={styles["navbar__item"]}>

                    </li>
                    <li className={`${styles["navbar__item"]} ${styles["navbar__menu"]}`}>
                        <DropdownMenu currentUser={currentUserId} />
                    </li>
                </ul>
            </nav>
        </header>
    )
}