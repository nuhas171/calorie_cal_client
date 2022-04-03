import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import RootContext from "../../utils/context";

const menuList = [
  {
    title: "Profile",
    link: "/user/me",
    icon: <PersonIcon />,
  },
  {
    title: "Logout",
    link: "/",
    icon: <LogoutIcon />,
  },
];

function SimpleDialog({ onClose, selectedValue, open }) {
  const rootContext = useContext(RootContext)

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }}>
        {menuList.map((menu) => (
          <ListItem
            component={Link}
            to={menu.link}
            button
            onClick={() => {
              if(menu.title === "Logout") {
                rootContext.removeJwt()
              }
              handleListItemClick(menu)
            }}
            key={menu.link}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                {menu.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={menu.title} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(menuList[1].title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AccountCircleIcon />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
