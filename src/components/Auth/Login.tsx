import gastroLogo from "../../../public/assets/Chef_green.svg"
import Link from "next/link"
import styles from "./auth.module.css"
import { loginAction } from "../../dataManagers/authManagers/server/authManagers"

const Login = () => {

    return (
        <main className={styles["container--login"]}>
            <section className={styles["form--login"]}>
                <form action={loginAction}>
                    <section className={styles["login--headerContainer"]}>
                        <div className={styles["login--logoContainer"]}>
                            <img className={styles["login--logo"]} src={gastroLogo.src} alt="Logo"></img>
                        </div>
                        <div className="login--headerFlex">
                            <h1 className={styles["login--header"]}>Gastro Gnome</h1>
                            <h2 className={styles["login--header"]} id={styles["pleaseSignIn"]}>Please sign in</h2>
                        </div>
                    </section>
                    <fieldset>
                        <label htmlFor="inputEmail"> Username </label>
                        <input type="text"
                            name="username"
                            className={styles["form-control"]}
                            id="inputEmail"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            name="password"
                            className={styles["form-control"]}
                            id="inputPassword"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <div className={styles["btn-primary-wrapper"]}>
                            <button type="submit" className={styles["btn-primary"]}>
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
                <section className={styles["linkGroup"]}>
                    <Link href="/register">Create an Account</Link>
                    <Link href="/">Back to Home</Link>
                </section>
            </section>
            
        </main>
    )
}
export default Login