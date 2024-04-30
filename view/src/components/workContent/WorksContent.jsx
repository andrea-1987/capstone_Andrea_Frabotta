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
 
  const getAllWorks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/works?page=${page}`);
      const data = await response.json();
      setWorks(data.payload); 
      setTotalPages(data.totalPages); 
    } catch (error) {
      alert("Error fetching works:", error);
    }
  };

  useEffect(() => {
    getAllWorks();
    window.scrollTo(0, 0);
  }, [page]);

  const onPageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={`${styles.content}`}>
      {isLoading && <CustomSpinner />}
      {!isLoading && error && <ErrorAlert message="Ops! Qualcosa è andato storto" />}
      {!isLoading && !error && (
        works.map((work) => (
          <div key={work._id}>
            <UserCards
              className={`${styles.card}`}
              author={work.author}
              description={work.description}
              title={work.title}
              img={work.img}
              location={work.location}
              pubDate={work.pubDate}
              _id={work._id}
            />
          </div>
        ))
      )}

      <DefaultPagination
        onPageChange={onPageChange}
        currentPage={page}
        totalPage={totalPages} 
      />
    </div>
  );
};
