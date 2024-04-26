import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { AddWorkModal } from "../addWorkModal/AddWorkModal";
import { useState } from "react";

export function DefaultSidebar() {
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(!open);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>Dashboard</ListItem>
        <ListItem>E-Commerce</ListItem>
        <ListItem>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>Profile</ListItem>
        <ListItem>Settings</ListItem>
        <Button onClick={ handleOpen}variant="gradient">
          Add Work
        </Button>
        <Dialog
          open={open}
          handler={handleOpen}
          className="flex justify-center"
        >
          <AddWorkModal />
        </Dialog>
        <ListItem>Log Out</ListItem>
      </List>
    </Card>
  );
}
