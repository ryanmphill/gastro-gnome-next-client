'use client'
import { useRouter } from "next/navigation"
import gastroLogo from "../../../public/assets/Chef_green.svg"
import { FormEvent, useRef } from "react"
import Link from "next/link"
import styles from "./auth.module.css"
import { loginUser } from "@/dataManagers/authManager"
import { useAuthContext } from "@/context/AuthContext"

const Login = () => {
    const { fetchCurrentUserId, setToken } = useAuthContext()
    
    const username = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const user = {
            username: username?.current?.value ?? "",
            password: password?.current?.value ?? ""
          }

        try {
            const res = await loginUser(user)
            if (res.valid === true) {
                setToken(res.token)
                fetchCurrentUserId()
                router.push("/")
            } else {
                window.alert("Invalid username or password")
            }
        } catch (err) {
            console.error(err)
            window.alert("Unable to login")
        }
    }

    return (
        <main className={styles["container--login"]}>
            <section className={styles["form--login"]}>
                <form onSubmit={(e) => handleLogin(e)}>
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
                            ref={username}
                            className={styles["form-control"]}
                            id="inputEmail"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            ref={password}
                            className={styles["form-control"]}
                            id="inputPassword"
                            placeholder="Password"
                            required autoFocus />
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