import React from "react";
import { WorksContent } from "../workContent/WorksContent";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./professionalContent.module.css"


export const ProfessionalContent = () => {
  return (
    <div className={`${styles.content}`}>
      <SidebarWithSearch className={`${styles.sidebar}`} />
      <WorksContent className={`${styles.main}`} />
       </div>
  );
};
