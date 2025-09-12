"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Divider, Drawer, List, ListItem } from "@mui/material";

const TopBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar className="bg-[#11ab03]">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Wood eWorkV2
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div
          style={{ width: 250 }}
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
          className="bg-[#72c46a] h-screen text-white"
        >
          <div className="w-full h-[60px] flex justify-end pr-3">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon  />
            </IconButton>
          </div>
          <List className="flex flex-col gap-3">
            <ListItem
              className="cursor-pointer"
              onClick={() => console.log("หน้าแรก")}
            >
              <div>หน้าแรก</div>
            </ListItem>
            <ListItem
              className="cursor-pointer"
              onClick={() => console.log("เกี่ยวกับเรา")}
            >
              <div>เกี่ยวกับเรา</div>
            </ListItem>
            <ListItem
              className="cursor-pointer"
              onClick={() => console.log("ติดต่อ")}
            >
              <div>ติดต่อ</div>
            </ListItem>
          </List>
          <Divider className="pt-5" />
          <div className="w-full flex justify-center mt-10">
          <div
             className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-red-500"
              onClick={() => console.log("ออกจากระบบ")}
            >
              <p>ออกจากระบบ</p>
            </div>
            </div>
        </div>
      </Drawer>
    </>
  );
};

export default TopBar;
