import React from "react";
import { WorksContent } from "../workContent/WorksContent";
import { DefaultSidebar } from "../sidebar/SideBar";
import styles from "./professionalContent.module.css"

export const ProfessionalContent = () => {
  return (
    <div className={`${styles.content}`}>
      <DefaultSidebar className={`${styles.sidebar}`} />

      <WorksContent className={`${styles.main}`} />
    </div>
  );
};
