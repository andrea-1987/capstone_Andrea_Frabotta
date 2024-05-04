import React from "react";
import { useNavigate} from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import styles from "./card.module.css";

export function UserCards({ author, title, description, pubDate, img, location, _id }) {
  const navigate = useNavigate();
  

  const handleDetailPage = () => {
    navigate(`/works/${_id}`);
  };

  const handleSave = async () => {
    try {
      const session = localStorage.getItem("auth");
      const decodedSession = jwtDecode(session);
      
      console.log(decodedSession)
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/${decodedSession.role}/update/${decodedSession._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session}` 
        },
        body: JSON.stringify({
          preferWorks: [{ 
            author: author,
            title: title,
            description: description,
            pubDate: pubDate,
            img: img,
            location: location,
            id: _id,
          }]
        }),
      });
      
         if (response.ok) {
                    } else {
        console.error('Errore durante il salvataggio del lavoro:', response.statusText);
      }
    } catch (error) {
      console.error('Errore durante il salvataggio del lavoro:', error);
    }
  };
  return (
    <Card className={`w-full max-w-[48rem] flex-row `}>
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none aspect-ratio:16/9"
      >
        <img
          src={img}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {author}
        </Typography>
        <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {location}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {pubDate}
        </Typography>
        <Button
          onClick={handleDetailPage}
          variant="text"
          className="flex items-center gap-2"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
        <Button
          onClick={() => handleSave({
            author,
            title,
            description,
            pubDate,
            img,
            location,
            _id,
          })}
          variant="text"
          className="flex items-center gap-2"
        >
          Save
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </CardBody>
    </Card>
  );
}
