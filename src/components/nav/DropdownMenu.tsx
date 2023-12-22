'use client'
import { startTransition, useEffect, useState } from 'react';
import styles from './DropdownMenu.module.css' // Import CSS styles for the dropdown menu
import gastroHamburger from "../../../public/assets/hamburger_green.svg"
import Link from 'next/link';
import { logoutAction } from '@/dataManagers/authManagers/authManagers';
import Image from 'next/image';

export const DropdownMenu = ({ currentUser }: { currentUser: number }) => {
  const [isOpen, setIsOpen] = useState(false) // State to track if the dropdown is open or closed

  const toggleDropdown = () => {
    setIsOpen(!isOpen) // Toggle the state to open or close the dropdown
  }

  // Function to untoggle the dropdown when the user clicks anywhere else 
  function handleOutsideClick(this: Document, event: MouseEvent) {
    const dropdownContainer: HTMLElement | null = document.querySelector('.DropdownMenu_dropdown__Gt85c')
    const target = event.target as Node
    if (dropdownContainer && !dropdownContainer.contains(target)) {
      setIsOpen(false)
    }
  }
  /* Observe when dropdown state changes between open and closed, then 
    add and remove event listener to run handleOutsideClick callback function*/
  useEffect(
    () => {
      if (isOpen) {
        /* When the dropdown is open, add an event listener that
           closes the dropdown when the user clicks anywhere else */
        document.addEventListener('click', handleOutsideClick)
      } else {
        // When dropdown is closed, remove event listener
        document.removeEventListener('click', handleOutsideClick)
      }
      return () => {
        /* Remove the event listener everytime the component is rendered
           with a cleanup function */
        document.removeEventListener('click', handleOutsideClick)
      }
    },
    [isOpen]
  )

  return (
    <div className={styles.dropdown}>
      <button className={styles["dropdown-button"]} onClick={toggleDropdown}>
        <Image src={gastroHamburger} alt="hamburger menu" id={styles.gastroHamburger}></Image>
      </button>
      {isOpen && <>
        <section className={styles["dropdown-content"]} onClick={toggleDropdown}>
          <Link className={styles["dropdown--link"]} href={"/"}>Home</Link>
          { // Authenticated or unauthenticated user views
            currentUser !== 0
              ? <>
                <Link className={styles["dropdown--link"]} href={`/profile/${currentUser}`}>Profile</Link>
                <div className="navbar__menuItem navbar__logout">
                  <button className={`${styles["dropdown--link"]} ${styles["dropdown--btn_link"]}`}
                    onClick={() => startTransition(() => logoutAction())}>
                    Logout
                  </button>
                </div>
              </>
              : <>
                <Link className={styles["dropdown--link"]} href={"/login"}>Login</Link>
                <Link className={styles["dropdown--link"]} href={"/register"}>Register</Link>
              </>
          }
        </section>
      </>
      }
    </div>
  )
}
