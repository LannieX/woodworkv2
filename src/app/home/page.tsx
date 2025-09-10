"use client";

import TopBar from "@/componants/topBar";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const WoodType = [
  { id: 1, label: "ไม้คัด" },
  { id: 2, label: "ไม้ฟืน" },
  { id: 1, label: "ไม้รวม" },
  { id: 2, label: "ไม้ฟืนป่า" },
];

const HomePage = () => {
  return (
    <>
      <TopBar />
      <div className="w-full h-screen bg-white p-3">
        <div className="w-full flex flex-col justify-center gap-5 pt-5">
          <Autocomplete
            disablePortal
            fullWidth
            options={WoodType}
            renderInput={(params) => (
              <TextField {...params} label="สถานที่" fullWidth />
            )}
          />
          <Autocomplete
            disablePortal
            fullWidth
            options={WoodType}
            renderInput={(params) => (
              <TextField {...params} label="ชนิดไม้" fullWidth />
            )}
          />
          <Autocomplete
            disablePortal
            fullWidth
            options={WoodType}
            renderInput={(params) => (
              <TextField {...params} label="ทะเบียนรถ" fullWidth />
            )}
          />
          <TextField id="outlined-basic" label="น้ำหนัก" variant="outlined" />
          <TextField id="outlined-basic" label="ราคา" variant="outlined" />
          <div className="w-full flex flex-row gap-6 justify-center mt-10">
            <div className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-green-500 hover:bg-green-600 cursor-pointer">
              <p>จ่ายบิล</p>
            </div>
            <div className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-red-500 hover:bg-red-600 cursor-pointer">
              <p>ไม่จ่ายบิล</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
