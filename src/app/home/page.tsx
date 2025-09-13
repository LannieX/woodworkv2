"use client";

import DialogConfirm from "@/componants/dialog";
import { Alert, Autocomplete, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const woodOptions = [
  { id: 1, label: "TEST1" },
  { id: 2, label: "TEST2" },
  { id: 3, label: "TEST3" },
];

const pad = (n: number) => n.toString().padStart(2, "0");

const HomePage = () => {
  //stateData
  const [address, setAddress] = useState<string>("");
  const [woodType, setWoodType] = useState<string>("");
  const [carNumber, setCarNumber] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  //dataDropdown
  const [woodTypeDropdown, setWoodTypeDropdown] = useState<string[]>([]);
  const [carNumberDropdown, setCarNumberDropdown] = useState<string[]>([]);
  const [addressDropdown, setAddressDropdown] = useState<string[]>([]);

  //Dialog
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);

  // State สำหรับ snackbar
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
  

  const handleResetValue = () => {
    setAddress("");
    setWoodType("");
    setCarNumber("");
    setWeight("");
    setPrice("");
  };

    const fetchTypes = async () => {
    try {
      const res = await axios.get("https://wood-api-zl5b.onrender.com/type");
      console.log("TYPES:", res.data);

      const parsed = res.data.map((item: string[]) => item[0]);

      setWoodTypeDropdown(parsed);
    } catch (err) {
      console.error("FETCH TYPE ERROR", err);
    }
  };

  const fetchCarNumber = async () => {
    try {
      const res = await axios.get("https://wood-api-zl5b.onrender.com/car");
      const parsed = res.data.map((item: string[]) => item[0]);
      setCarNumberDropdown(parsed);
    } catch (err) {
      console.error("FETCH CODES ERROR", err);
    }
  };

    const fetchAddress = async () => {
    try {
      const res = await axios.get("https://wood-api-zl5b.onrender.com/address");
      const parsed = res.data.map((item: string[]) => item[0]);
      setAddressDropdown(parsed);
    } catch (err) {
      console.error("FETCH CODES ERROR", err);
    }
  };

  const handleOpen = (type: string) => {
    setActionType(type);
    setOpen(true);
  };

  const handleConfirm = () => {
    console.log("ทำรายการ:", actionType);
    setOpen(false);
    handleCreate(actionType ?? '')
  };

  const handleCancel = () => {
    setOpen(false);
    setActionType(null);
  };

  const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};


const handleCreate = (payBill: string) => {
  const now = new Date();
  const yearBE = now.getFullYear() + 543;
  const dateAt = `${pad(now.getHours())}:${pad(now.getMinutes())} ${pad(
    now.getDate()
  )}/${pad(now.getMonth() + 1)}/พ.ศ. ${yearBE}`;

  const data = {
    address,
    woodType,
    carNumber,
    weight,
    price,
    payBill,
    dateAt,
  };

  console.log("data", data);

  axios
    .post("https://wood-api-zl5b.onrender.com/data", data)
    .then((res) => {
      console.log("POST success", res.data);
      handleResetValue();

      // แสดง snackbar success
      setSnackbarMessage("เพิ่มข้อมูลสำเร็จ!");
      setSnackbarOpen(true);
    })
    .catch((err) => {
      console.error("POST error", err);

      setSnackbarMessage("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      setSnackbarOpen(true);
    });
};

  useEffect(() => {
 fetchTypes()
 fetchAddress()
 fetchCarNumber()

}, []);


  return (
    <div className="w-full h-screen bg-white p-3">
      <div className="w-full flex flex-col justify-center gap-5 pt-5">
        <Autocomplete
          disablePortal
          fullWidth
          options={addressDropdown}
          getOptionLabel={(option) => option}
          value={address}
          onChange={(event, newValue) => setAddress(newValue ?? "")}
          renderInput={(params) => (
            <TextField {...params} label="สถานที่" fullWidth />
          )}
        />
        <Autocomplete
          disablePortal
          fullWidth
          options={woodTypeDropdown}
          getOptionLabel={(option) => option}
          value={woodType}
          onChange={(event, newValue) => setWoodType(newValue ?? "")}
          renderInput={(params) => (
            <TextField {...params} label="ชนิดไม้" fullWidth />
          )}
        />

        <Autocomplete
          disablePortal
          fullWidth
          options={carNumberDropdown}
          getOptionLabel={(option) => option}
          value={carNumber}
          onChange={(event, newValue) => setCarNumber(newValue ?? "")}
          renderInput={(params) => (
            <TextField {...params} label="ทะเบียนรถ" fullWidth />
          )}
        />

        <TextField
          label="น้ำหนัก"
          variant="outlined"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <TextField
          label="ราคา"
          variant="outlined"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="w-full flex flex-row gap-6 justify-center mt-10">
          <div
        className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-green-500 hover:bg-green-600 cursor-pointer"
        onClick={() => handleOpen("จ่ายบิล")}
      >
        <p>จ่ายบิล</p>
      </div>
      <div
        className="w-[80%] h-[40px] flex items-center rounded-[15px] justify-center bg-red-500 hover:bg-red-600 cursor-pointer"
        onClick={() => handleOpen("ไม่จ่ายบิล")}
      >
        <p>ไม่จ่ายบิล</p>
      </div>
        </div>
      </div>
       <DialogConfirm
        open={open}
        actionType={actionType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarMessage.includes("สำเร็จ") ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </div>
  );
};

export default HomePage;
