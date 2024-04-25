import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard";
import { getAllWorks, allWorks, isWorkLoading, worksError } from "../../redux/WorkCardSlice";

export const WorksContent = () => {
  const dispatch = useDispatch();
  const works = useSelector(allWorks);
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);

  useEffect(() => {
    dispatch(getAllWorks());
  }, [dispatch]);

  return (
      <div>
        {isLoading && <CustomSpinner />}
        {!isLoading && error && <ErrorAlert message="Ops! qualcosa è andato storto" />}
        {!isLoading && !error && (
          works.payload && works.payload.map((work) => (
            <div key={work._id}>
              <UserCards
                author={work.author}
                description={work.description}
                title={work.title}
                img={work.img}
              />
            </div>
          ))
        )}
      </div>
  );
};
