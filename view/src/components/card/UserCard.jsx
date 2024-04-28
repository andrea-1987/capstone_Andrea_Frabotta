import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function UserCards({
  author,
  title,
  description,
  pubDate,
  img,
  location,
  _id,
}) {
  const navigate = useNavigate();
  const handleDetailPage = () => {
    navigate(`/works/${_id}`);
  };

  return (
    <Card className="w-full max-w-[48rem] flex-row">
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
        <div className="display-flex justify-content:space between">
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {author}
          </Typography>
        </div>
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
        <a href="#" className="inline-block">
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
        </a>
      </CardBody>
    </Card>
  );
}
