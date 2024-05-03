import React, { useState,useEffect } from "react";
import { SidebarWithSearch } from "../sidebar/SideBar";
import styles from "./personalContent.module.css";
import { jwtDecode } from "jwt-decode";
import { UserCards } from "../card/UserCard";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { DefaultPagination } from "../pagination/Pagination";
import useSession from "../../hooks/useSession";
import { worksError,isWorkLoading } from "../../redux/WorkCardSlice";
import { useSelector } from "react-redux";

export const PersonalContent = () => {
  const session = localStorage.getItem("auth")
  const decodedSession=jwtDecode(session)
  const isAuthenticated = useSession();
  const isLoading = useSelector(isWorkLoading);
  const error = useSelector(worksError);

  const [page, setPage] = useState(1);
  const [works, setWorks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const privatePage=async()=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/${decodedSession.role}/${decodedSession._id}?page=${page}`,{
        method: 'GET',
        headers: {
          "Content-type": 'application/json',
          "authorization": decodedSession
        }
      });
      const data = await response.json();

      setWorks(data.payload); 
      setTotalPages(data.totalPages); 
    
        } catch (error) {
      alert("Error fetching works:", error);
    }
    console.log(works.preferWorks)
  };
  useEffect(()=>{
    privatePage();
    window.scrollTo(0, 0);
  },[page])
  const onPageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className={`${styles.content}`}>
      <SidebarWithSearch />
      <div className={`${styles.main}`}>
      {isLoading && <CustomSpinner />}
      {!isLoading && error && <ErrorAlert message="Ops! Qualcosa è andato storto" />}
      {isAuthenticated &&!isLoading && !error && (
        works.preferWorks &&
    works.preferWorks.map((work) => (
          <div key={work._id}>
            <UserCards
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
    </div>
  );
};
