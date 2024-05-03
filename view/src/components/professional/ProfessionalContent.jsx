import { WorksContent } from "../workContent/WorksContent";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./professionalContent.module.css";
import { jwtDecode } from "jwt-decode";



export const ProfessionalContent = () => {
  const session = localStorage.getItem("auth")
  const decodedSession=jwtDecode(session)
  
  return (
    <div className={`${styles.content}`}>
      <SidebarWithSearch className={``} />
      <WorksContent className={``} />
       </div>
  );
};
