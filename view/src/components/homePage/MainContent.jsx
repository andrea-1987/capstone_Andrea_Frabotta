import React from "react";
import { UserCard } from "./section/UserSection";
import { ProfessionalCard } from "./section/ProfessionalSection";
import styles from "./main.module.css"

export const MainContent=()=>{
    return(
      <div className={`${styles.content}`}>
        <UserCard/>
        <ProfessionalCard/>
      </div>
    )
}