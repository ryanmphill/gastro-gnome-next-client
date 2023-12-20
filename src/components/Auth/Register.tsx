import Link from "next/link"
import styles from "./auth.module.css"
import { registerAction } from "@/dataManagers/authManagers/server/authManagers"

const Register = () => {

    return (
        <main className={styles["container--login"]}>
            <section className={styles["form--login"]}>
                <form action={registerAction} id={styles["registerContainer"]}>
                    <h1 className={styles["login--header"]}>Register for Gastro Gnome</h1>
                    <section className={styles["nameFlex"]}>
                        <fieldset className={styles["nameFlexChild"]}>
                            <label htmlFor="firstName"> First Name </label>
                            <input 
                                name="first_name"
                                type="text" id="firstName" className={styles["registerForm-control"]}
                                placeholder="Enter your first name" required autoFocus />
                        </fieldset>
                        <fieldset className={styles["nameFlexChild"]}>
                            <label htmlFor="lastName"> Last Name </label>
                            <input 
                                name="last_name"
                                type="text" id="lastName" className={styles["registerForm-control"]}
                                placeholder="Enter your last name" required />
                        </fieldset>
                    </section>
                    <fieldset>
                        <label htmlFor="newUserName"> Username </label>
                        <input 
                            name="username"
                            type="text" id="newUserName" className={styles["registerForm-control"]}
                            placeholder="Enter a new username" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email"> Email address </label>
                        <input 
                            name="email"
                            type="email" id="email" className={styles["registerForm-control"]}
                            placeholder="Email address" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="newPassword"> Password </label>
                        <input 
                            name="password"
                            type="password" id="newPassword" className={styles["registerForm-control"]}
                            placeholder="Enter a password" required />
                    </fieldset>
                    <fieldset>
                        <div className={styles["btn-primary-wrapper"]}>
                            <button type="submit" className={styles["btn-primary"]}> Register </button>
                        </div>
                    </fieldset>
                </form>
                <section className={styles["linkGroup"]}>
                    <Link href="/login">Login</Link>
                    <Link href="/">Back to Home</Link>
                </section>
            </section>
        </main>
    )
}

export default Register