import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard";
import { getAllWorks, allWorks, isWorkLoading, worksError } from "../../redux/WorkCardSlice";
import styles from "./workContent.module.css";
import { DefaultPagination } from "../pagination/Pagination";

export const WorksContent = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);
  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getWorks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/works?page=${page}`);
      const data = await response.json();
      setWorks(data.payload); // Imposta solo i dati dei lavori, non l'intera risposta
      setTotalPages(data.totalPages); // Imposta il numero totale di pagine
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  };

  useEffect(() => {
    getWorks();
  }, [page]);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.content}>
      {isLoading && <CustomSpinner />}
      {!isLoading && error && <ErrorAlert message="Ops! Qualcosa è andato storto" />}
      {!isLoading && !error && (
        works.map((work) => (
          <div key={work._id}>
            <UserCards
              className={`${styles.card} size-24`}
              author={work.author}
              description={work.description}
              title={work.title}
              img={work.img}
              location={work.location}
              pubDate={work.pubDate}
            />
          </div>
        ))
      )}

      <DefaultPagination
        className={styles.pagination}
        onPageChange={onPageChange}
        currentPage={page}
        totalPage={totalPages} 
      />
    </div>
  );
};





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { CustomSpinner } from "../loading/Loader";
// import { ErrorAlert } from "../error/Error";
// import { UserCards } from "../card/UserCard";
// import { getAllWorks, allWorks, isWorkLoading, worksError, selectTotalPage, selectTotalWorks, selectPageSize } from "../../redux/WorkCardSlice";
// import { DefaultPagination } from "../pagination/Pagination";
// import styles from "./workContent.module.css";

// export const WorksContent = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(isWorkLoading);
//   const error = useSelector(worksError);
//   const works = useSelector(allWorks);
//   const totalPage = useSelector(selectTotalPage);
//   const totalWorks = useSelector(selectTotalWorks);
//   const pageSize = useSelector(selectPageSize);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(getAllWorks(page));
//   }, [dispatch, page]);

//   const onPageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <div className={styles.content}>
//       {isLoading && <CustomSpinner />}
//       {!isLoading && error && <ErrorAlert message="Ops! Qualcosa è andato storto" />}
//       {!isLoading && !error && (
//         works.payload &&
//         works.payload.map((work) => (
//           <div key={work._id}>
//             <UserCards
//               className={`${styles.card} size-24`}
//               author={work.author}
//               description={work.description}
//               title={work.title}
//               img={work.img}
//               location={work.location}
//               pubDate={work.pubDate}
//             />
//           </div>
//         ))
//       )}

//       <DefaultPagination
//         className={styles.pagination}
//         onPageChange={onPageChange}
//         currentPage={page}
//         totalPage={totalPage}
//       />
//     </div>
//   );
// };
