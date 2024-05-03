import React, { useState } from "react";
import { AddWorkModal } from "../addWorkModal/AddWorkModal";
import {
  Card,
  Typography,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,

  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const SidebarWithSearch = () => {


  const [open, setOpen] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [jobFilter, setJobFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filtered, setFiltered] = useState({ job: "", location: "" });

    
  const location = useLocation();
   const navigate = useNavigate();

  const handleJobFilterChange = (e) => {
    const { value } = e.target;
    setJobFilter(value);
    setFiltered((prevFiltered) => ({
      ...prevFiltered,
      job: value,
    }));
  };

  const handleLocationFilterChange = (e) => {
    const { value } = e.target;
    setLocationFilter(value);
    setFiltered((prevFiltered) => ({
      ...prevFiltered,
      location: value,
    }));
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOpenModal = () => setOpenModal(!openModal);
  const shouldShowAddWorkButton =
  location.pathname.startsWith("/professional");

  const showInput = location.pathname === "/professional" && "/user";

  const personalPage = async (e) => {
    e.preventDefault();
    const session = localStorage.getItem("auth")
    const decodedSession=jwtDecode(session)
          try {
                      const role = decodedSession.role;
            if (role === 'user') {
              navigate(`/user/${decodedSession._id}`);
            } else if (role === 'professional') {
              navigate(`/professional/${decodedSession._id}`);
            } else {
              alert('Unknown role');
            }
          } catch (error) {
            throw new Error('Failed to parse token');
           }
  };

  console.log();
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />

        <Typography className="my-2" variant="h5" color="blue-gray">
          Just Do It
        </Typography>
      </div>
      <div>
      <div className="p-2 m-2">
        {showInput && (
          <div  className="my-2">
            <Typography variant="h5" color="blue-gray">
              Job
            </Typography>
            <Input
              onChange={handleJobFilterChange}
              value={jobFilter}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
        )}
        {showInput && (
          <div className="my-2">
            <Typography  variant="h5" color="blue-gray">
              Location
            </Typography>
            <Input
              onChange={handleLocationFilterChange}
              value={locationFilter}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
        )}
      </div>
      <ListItem className="my-2"
      onClick={personalPage}
            >
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Profile
      </ListItem>
      <ListItem className="my-2">
        <ListItemPrefix>
          <Cog6ToothIcon className="h-5 w-5" />
        </ListItemPrefix>
        Settings
      </ListItem>
      <ListItem className="my-2">
          <ListItemPrefix>
             <InboxIcon className="h-5 w-5" />
           </ListItemPrefix>
           Inbox
          <ListItemSuffix>
           <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
         </ListItemSuffix>
        </ListItem>
        </div>
      {shouldShowAddWorkButton && (
        <Button className="mt-2"
         onClick={handleOpenModal} variant="gradient">
          Add Work
        </Button>
      )}
      <Dialog
        open={openModal}
        handler={handleOpenModal}
        className="flex justify-center"
      >
        <AddWorkModal />
      </Dialog>
      <div>
      <ListItem>
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
      </div>
    </Card>
  );
}

