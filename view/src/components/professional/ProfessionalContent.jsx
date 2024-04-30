import React,{useState} from "react";
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

// export const ProfessionalContent=()=>{
//   const [jobFilter, setJobFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");

//   const handleJobFilterChange = (newJobFilter) => {
//     setJobFilter(newJobFilter);
//   };

//   const handleLocationFilterChange = (newLocationFilter) => {
//     setLocationFilter(newLocationFilter);
//   };

//   return (
//     <div>
//       <SidebarWithSearch
//         onJobFilterChange={handleJobFilterChange}
//         onLocationFilterChange={handleLocationFilterChange}
//       />
//       <WorksContent
//         jobFilter={jobFilter}
//         locationFilter={locationFilter}
//       />
//     </div>
//   );
// }
