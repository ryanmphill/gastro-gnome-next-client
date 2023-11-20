'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useRef } from "react"
import styles from "./auth.module.css"
import { registerUser } from "@/dataManagers/authManagers/client/authManager"
import { useAuthContext } from "@/context/AuthContext"
import { registerAction } from "@/dataManagers/authManagers/server/authManagers"

const Register = () => {
    const router = useRouter()
    const { fetchCurrentUserId, setToken } = useAuthContext()
    const firstName = useRef<HTMLInputElement | null>(null)
    const lastName = useRef<HTMLInputElement | null>(null)
    const username = useRef<HTMLInputElement | null>(null)
    const email = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userData = {
            first_name: firstName?.current?.value ?? "",
            last_name: lastName?.current?.value ?? "",
            username: username?.current?.value ?? "",
            email: email?.current?.value ?? "",
            password: password?.current?.value ?? ""
        }
        
        try {
            const res = await registerUser(userData)
            if (res.token) {
                setToken(res.token)
                fetchCurrentUserId()
                router.push("/")
                return;
            }
            if (res.message && res.message.includes("Username already taken")) {
                window.alert(res.message)
                return;
            }
        } catch (err) {
            console.error(err)
            window.alert("Unable to register user")
        }
    }

    return (
        <main className={styles["container--login"]}>
            <section className={styles["form--login"]}>
                <form action={registerAction} id={styles["registerContainer"]}>
                    <h1 className={styles["login--header"]}>Register for Gastro Gnome</h1>
                    <section className={styles["nameFlex"]}>
                        <fieldset className={styles["nameFlexChild"]}>
                            <label htmlFor="firstName"> First Name </label>
                            <input 
                                ref={firstName}
                                name="first_name"
                                type="text" id="firstName" className={styles["registerForm-control"]}
                                placeholder="Enter your first name" required autoFocus />
                        </fieldset>
                        <fieldset className={styles["nameFlexChild"]}>
                            <label htmlFor="lastName"> Last Name </label>
                            <input 
                                ref={lastName}
                                name="last_name"
                                type="text" id="lastName" className={styles["registerForm-control"]}
                                placeholder="Enter your last name" required autoFocus />
                        </fieldset>
                    </section>
                    <fieldset>
                        <label htmlFor="newUserName"> Username </label>
                        <input 
                            ref={username}
                            name="username"
                            type="text" id="newUserName" className={styles["registerForm-control"]}
                            placeholder="Enter a new username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email"> Email address </label>
                        <input 
                            ref={email}
                            name="email"
                            type="email" id="email" className={styles["registerForm-control"]}
                            placeholder="Email address" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="newPassword"> Password </label>
                        <input 
                            ref={password}
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