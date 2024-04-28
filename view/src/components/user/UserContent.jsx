import React from "react";
import { WorksContent } from "../workContent/WorksContent";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./userContent.module.css";

export const UserContent = () => {
  return (
    <div className={`flex ${styles.content}`}>
      <SidebarWithSearch />
      <WorksContent />
    </div>
  );
};
