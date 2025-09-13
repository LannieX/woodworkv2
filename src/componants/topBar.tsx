"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Drawer, List, ListItem } from "@mui/material";
import { useRouter, usePathname } from "next/navigation"; // 👈 usePathname

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // path ปัจจุบัน เช่น "/home" หรือ "/data"

  const [open, setOpen] = useState(false);

  // function ตรวจสอบ active
  const isActive = (path: string) => pathname === path;

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
          className="bg-[#72c46a] h-screen text-white"
        >
          <div className="w-full h-[60px] flex justify-end pr-3">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <List className="flex flex-col gap-3">
            <ListItem
              className={`cursor-pointer ${
                isActive("/home") ? "bg-orange-500" : ""
              } px-4 py-2 rounded`}
              onClick={() => {
                router.push("/home"); // ไปหน้า
                setOpen(false); // ปิด sidebar
              }}
            >
              หน้าแรก
            </ListItem>
            <ListItem
              className={`cursor-pointer ${
                isActive("/data") ? "bg-orange-500" : ""
              } px-4 py-2 rounded`}
              onClick={() => {
                router.push("/data"); // ไปหน้า
                setOpen(false); // ปิด sidebar
              }}
            >
              ดูข้อมูล
            </ListItem>
            {/* <ListItem
              className={`cursor-pointer ${
                isActive("/contact") ? "bg-orange-500" : ""
              } px-4 py-2 rounded`}
              onClick={() => console.log("ติดต่อ")}
            >
              ติดต่อ
            </ListItem> */}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default TopBar;
