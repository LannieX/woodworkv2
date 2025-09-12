"use client";

import TopBar from "@/componants/topBar";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const woodOptions = [
  { id: 1, label: "TEST1" },
  { id: 1, label: "TEST1" },
];

const HomePage = () => {
  const [address, setAddress] = useState<string>('');
  const [woodType, setWoodType] = useState<string>('');
  const [carNumber, setCarNumber] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleResetValue = () => {
    setAddress('');
    setWoodType('');
    setCarNumber('');
    setWeight('');
    setPrice('');
  };

  const handleCreate = () => {
    console.log("data", address, woodType, weight, carNumber, price);

    const data = {
      address,
      woodType,
      carNumber,
      weight,
      price,
    };
    axios
      .post(
        "https://api.sheetbest.com/sheets/0f74a006-170a-437f-ae8d-957035ed2de4",
        data
      )
      .then((res) => {
        console.log(res);
      });
      handleResetValue()
  };

  return (
    <>
      <TopBar />
      <div className="w-full h-screen bg-white p-3">
        <div className="w-full flex flex-col justify-center gap-5 pt-5">
          <Autocomplete
            disablePortal
            fullWidth
            options={woodOptions}
            getOptionLabel={(option) => option.label}
            value={
              woodOptions.find((option) => option.label === address) || null
            }
            onChange={(event, newValue) => setAddress(newValue?.label ?? '')}
            renderInput={(params) => (
              <TextField {...params} label="สถานที่" fullWidth />
            )}
          />
          <Autocomplete
            disablePortal
            fullWidth
            options={woodOptions}
            getOptionLabel={(option) => option.label}
            value={
              woodOptions.find((option) => option.label === woodType) || null
            }
            onChange={(event, newValue) => setWoodType(newValue?.label ?? '')}
            renderInput={(params) => (
              <TextField {...params} label="ชนิดไม้" fullWidth />
            )}
          />
          <Autocomplete
            disablePortal
            fullWidth
            options={woodOptions}
            getOptionLabel={(option) => option.label}
            value={
              woodOptions.find((option) => option.label === carNumber) || null
            }
            onChange={(event, newValue) =>
              setCarNumber(newValue?.label ?? '')
            }
            renderInput={(params) => (
              <TextField {...params} label="ทะเบียนรถ" fullWidth />
            )}
          />

          <TextField
            id="outlined-basic"
            label="น้ำหนัก"
            variant="outlined"
            type="number"
            inputProps={{
              step: "0.01",
              min: "0",
            }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="ราคา"
            variant="outlined"
            type="number"
            inputProps={{
              step: "0.01",
              min: "0",
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="w-full flex flex-row gap-6 justify-center mt-10">
            <div
              className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={handleCreate}
            >
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
