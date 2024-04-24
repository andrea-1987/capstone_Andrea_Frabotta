import React from "react";
import { AddWorkModal } from "../addWorkModal/AddWorkModal";
import { useState, useEffect } from "react";
import { CustomSpinner } from "../loading/Loader";
import { ErrorAlert } from "../error/Error";
import { UserCards } from "../card/UserCard"


export const ProfessionalContent = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [works,setWorks] = useState([])

    const getWorks = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:4040/works', {
                method: 'GET',
                headers: {
                    "Content-type": 'application/json',
                    "authorization": ""
                }
            })
            if(response.ok){
                const data = await response.json()
                setWorks(data)
            }else{
                throw new Error("Somethinks wrong!")
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
            getWorks()
    }, [])

    return (
        <>
      <AddWorkModal></AddWorkModal>
        <div className="container pt-5 pb-5">
            <div className="row">
                {isLoading && <CustomSpinner />}
                {!isLoading && error && (
                    <ErrorAlert
                        message="Oops! Qualcosa è andato storto durante il caricamento dei dati"
                    />
                )}
                {!isLoading && !error && (
                    works.works && works.works.map((work) => (
                        <div key={work._id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                            <UserCards
                                title={work.title}
                                description={work.description}
                                img={work.img}
                                author={work.author}
                                
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
}

