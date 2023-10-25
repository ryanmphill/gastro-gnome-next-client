'use client'

import { useEffect, useState } from 'react';
import styles from './DropdownMenu.module.css' // Import CSS styles for the dropdown menu
import gastroHamburger from "../../../public/assets/hamburger_green.svg"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const DropdownMenu = ( {currentUser} : {currentUser: {id?:number}} ) => {
    const [isOpen, setIsOpen] = useState(false) // State to track if the dropdown is open or closed
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen) // Toggle the state to open or close the dropdown
    }

    // Function to untoggle the dropdown when the user clicks anywhere else 
    const handleOutsideClick = (event:any) => {
        const dropdownContainer:any = document.querySelector('.DropdownMenu_dropdown__Gt85c')
        if (!dropdownContainer.contains(event.target)) {
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

    //Import useNavigate and assign it to a variable
    const router = useRouter()

    return (
      <div className={styles.dropdown}>
        <button className={styles["dropdown-button"]} onClick={toggleDropdown}>
          <img src={gastroHamburger.src} alt="hamburger menu" id={styles.gastroHamburger}></img>
        </button>
        {isOpen && <>
            <section className={styles["dropdown-content"]} onClick={toggleDropdown}>
            <Link className={styles["dropdown--link"]} href={"/"}>Home</Link>
              <Link className={styles["dropdown--link"]} href={`/userprofile/${currentUser.id}`}>Profile</Link>
              { // Logout button
                localStorage.getItem("gastro_user")
                  ? <div className={`${styles["navbar__menuItem"]} ${styles["navbar__logout"]}`}>
                    <Link className={styles["dropdown--link"]} href={""} onClick={() => {
                      localStorage.removeItem("gastro_user")
                      router.push("/")
                    }}>Logout</Link>
                  </div>
                  : ""
              }
            </section>
        </> 
        }
      </div>
    )
  }
  