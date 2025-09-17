"use client";

import DialogConfirm from "@/componants/dialog";
import LoadingDialog from "@/componants/loading-dialog";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCarTdropdown = [
  "ใช้รถยนต์และรถไถ",
  "ใช้แค่รถยนต์",
  "ใช้แค่รถไถ",
  "ไม่ใช้รถ",
];

const pad = (n: number) => n.toString().padStart(2, "0");

type Prices = {
  cutPrice: number;
  carryPrice: number;
  carPrice: number;
  carTPrice: number;
  constPrice: number;
  totalPrice: number;
  profitPrice: number;
};

function calculatePrices(
  weight: number,
  price: number,
  useCarT: string
): Prices {
  const cutPrice = weight * 0.15;
  const carryPrice = weight * 0.1;
  const constPrice = weight * 1;
  const carPrice =
    useCarT === "ใช้รถยนต์และรถไถ" || useCarT === "ใช้แค่รถยนต์"
      ? weight * 0.15
      : 0;
  const carTPrice =
    useCarT === "ใช้รถยนต์และรถไถ" || useCarT === "ใช้แค่รถไถ" ? weight * 0.15 : 0;

  const totalPrice = weight * price;

  const profitPrice = totalPrice - (cutPrice + carryPrice + carPrice + carTPrice + constPrice);

  return {
    cutPrice,
    carryPrice,
    carPrice,
    carTPrice,
    constPrice,
    totalPrice,
    profitPrice,
  };
}

const HomePage = () => {
  //stateData
  const [address, setAddress] = useState<string>("");
  const [woodType, setWoodType] = useState<string>("");
  const [carNumber, setCarNumber] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [useCar, setUseCar] = useState<string>("");

  //dataDropdown
  const [woodTypeDropdown, setWoodTypeDropdown] = useState<string[]>([]);
  const [carNumberDropdown, setCarNumberDropdown] = useState<string[]>([]);
  const [addressDropdown, setAddressDropdown] = useState<string[]>([]);

  //Dialog
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);

  //loding
  const [isLoading, setIsLoading] = useState(false);

  const handleResetValue = () => {
    setAddress("");
    setWoodType("");
    setCarNumber("");
    setWeight("");
    setPrice("");
    setUseCar("");
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
    handleCreate(actionType ?? "");
  };

  const handleCancel = () => {
    setOpen(false);
    setActionType(null);
  };

  const handleCreate = (payBill: string) => {
    if (
      !address.trim() ||
      !woodType.trim() ||
      !carNumber.trim() ||
      !weight.trim() ||
      !price.trim() ||
      !useCar.trim()
    ) {
      console.log("error");
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsLoading(true);
    const now = new Date();
    const yearBE = now.getFullYear() + 543;
    const dateAt = `${pad(now.getHours())}:${pad(now.getMinutes())} ${pad(
      now.getDate()
    )} / ${pad(now.getMonth() + 1)} / ${yearBE}`;

    const {
      cutPrice,
      carryPrice,
      carPrice,
      carTPrice,
      constPrice,
      profitPrice,
    } = calculatePrices(Number(weight), Number(price), useCar);

    const data = {
      address,
      woodType,
      carNumber,
      weight,
      price,
      payBill,
      dateAt,
      cutPrice,
      carryPrice,
      carPrice,
      carTPrice,
      constPrice,
      profitPrice,
    };

    console.log("data", data);

    axios
      .post("https://wood-api-zl5b.onrender.com/data", data)
      .then((res) => {
        console.log("POST success", res.data);
        handleResetValue();
        setIsLoading(false);
        toast.success("บันทึกข้อมูลสำเร็จ!");
      })
      .catch((err) => {
        console.error("POST error", err);
      });
  };

  useEffect(() => {
    fetchTypes();
    fetchAddress();
    fetchCarNumber();
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
        <Autocomplete
          disablePortal
          fullWidth
          options={useCarTdropdown}
          getOptionLabel={(option) => option}
          value={useCar}
          onChange={(event, newValue) => setUseCar(newValue ?? "")}
          renderInput={(params) => (
            <TextField {...params} label="การใช้รถไถ" fullWidth />
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
          label="ราคาต่อกิโล"
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
      <LoadingDialog open={isLoading} />
    </div>
  );
};

export default HomePage;
