import gastroLogo from "../../../public/assets/Chef_green.svg"
import { DropdownMenu } from "./DropdownMenu"
import Link from "next/link"
import { getCurrentUserId } from "@/dataManagers/authManagers/authManagers"
import styles from "./NavBar.module.css"
import Image from "next/image"

export const NavBar = async () => {
    const currentUserId = await getCurrentUserId()
    return (
        <ul className={styles["navbar"]}>
            <li id={styles["logoContainer"]}>
                <Link href={"/"} className={styles["link_img_wrapper"]}>
                    <Image className={styles["navbar__logo"]} src={gastroLogo} alt="Logo"></Image>
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
    )
}