import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard";
import { selectIsLoading, selectWorks, selectError, selectTotalPage, getAllWorks } from "../../redux/WorkCardSlice";
import styles from "./workContent.module.css";
import { DefaultPagination } from "../pagination/Pagination";

export const WorksContent = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const works = useSelector(selectWorks);
  const totalPages = useSelector(selectTotalPage);

  useEffect(() => {
    dispatch(getAllWorks(1));
  }, [dispatch]);

  const onPageChange = (newPage) => {
    dispatch(getAllWorks(newPage)); 
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
        currentPage={1}
        totalPage={totalPages}
      />
    </div>
  );
};

