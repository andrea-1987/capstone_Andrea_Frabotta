import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export const AddWorkModal = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("uploadImg", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/works/cloudUploadImg`,
        {
          method: "POST",
          body: fileData,
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Somethinks wrong!");
      }
    } catch (e) {
      alert("Upload file failed", e.message);
    }
  };

  const submitwork = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const bodyToSend = {
          ...formData,
          img: uploadedFile.source,
        };
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/createWork`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyToSend),
          }
        );
        return await response.json();
      } catch (e) {
        alert("Submit work failed", e.message);
      }
    } else {
      throw new Error("Somethinks wrong!");
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Your Work
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to add a work.
      </Typography>
      <form encType="multipart/form-data"
        onSubmit={submitwork}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            name="author"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Job Title
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            name="title"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <Input
            onChange={onChangeHandleInput}
            type="text-area"
            name="description"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
           Image
          </Typography>
          <Input
            onChange={onChangeHandleFile}
            type="file"
            name="uploadImg"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          confirm
        </Button>
      </form>
    </Card>
  );
};
