import { WorksContent } from "../workContent/WorksContent";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./professionalContent.module.css"


export const ProfessionalContent = () => {
  return (
    <div className={`${styles.content}`}>
      <SidebarWithSearch className={``} />
      <WorksContent className={``} />
       </div>
  );
};
