import React, { useState } from "react";
import { AddWorkModal } from "../addWorkModal/AddWorkModal";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

export function SidebarWithSearch() {
  const [open, setOpen] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [jobFilter, setJobFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filtered,setFiltered]=useState({job:"",location:""})
  
  const location = useLocation();

  const handleJobFilterChange=(e)=>{
    const {value}=e.target 
    setJobFilter(value)
    if(value.lenght>0){
      setFiltered(filtered.job)
    }
  }
  
  const handleLocationFilterChange=(e)=>{
    const {value}=e.target 
    setLocationFilter(value)
     }
 

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleOpenModal = () => setOpenModal(!openModal);
  const shouldShowAddWorkButton = location.pathname === "/professionals";
  const showInput = location.pathname === "/professionals" && "/users"; 
console.log(jobFilter,locationFilter,filtered)
   return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />
        <Typography variant="h5" color="blue-gray">
        Just Do It
        </Typography>
      </div>
      <div className="p-2 m-2">
        {showInput &&(<div>
          <Typography variant="h5" color="blue-gray">
          Job
        </Typography>
          <Input
          onChange={handleJobFilterChange}
          value={jobFilter}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
        />
        </div>)}
        {showInput &&(<div>
          <Typography variant="h5" color="blue-gray">
          Location
        </Typography>
          <Input
          onChange={handleLocationFilterChange}
          value={locationFilter}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
        />
        </div>)}
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        {shouldShowAddWorkButton && (
          <Button onClick={handleOpenModal} variant="gradient">
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
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}