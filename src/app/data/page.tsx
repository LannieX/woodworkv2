"use client";

import { DataItem } from "@/types";
import {
    LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DataPage = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

   const fetchLatestData = () => {
  setLoading(true);
  axios
    .get("https://wood-api-zl5b.onrender.com/data")
    .then((res) => {
      console.log("GET", res);

      const [header, ...rows] = res.data;
      const mapped: DataItem[] = rows.map((row: string[]) => ({
        address: row[0] || "",
        woodType: row[1] || "",
        carNumber: row[2] || "",
        weight: row[3] || "",
        price: row[4] || "",
        payBill: row[5] || "",
        dateAt: row[6] || "",
      }));

      const sortedData = [...mapped].reverse();

      setData(sortedData);
    })
    .catch((err) => {
      console.error("GET error", err);
    })
    .finally(() => {
      setLoading(false);
    });
};


  useEffect(() => { 
    fetchLatestData()
  },[])

  return (
    <>
      <div className="w-full h-screen bg-white p-3">
        <div className="w-full flex justify-between m-5">
        <div className="w-[50%] flex items-center justify-start text-black text-[16px]">ข้อมูลงานทั้งหมด</div>
        <div className="w-[50%] flex flex-col items-end mt-5 pr-5">
      <button
        onClick={fetchLatestData}
        className={`w-[130px] py-2 rounded text-[12px] ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-orange-400 text-black hover:bg-orange-600 cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? "กำลังโหลด..." : "คลิกเพื่อดึงข้อมูลล่าสุด"}
      </button>

      <div className="mt-3 text-black text-[14px]">
        จำนวนข้อมูล: {data.length}
      </div>
    </div>
        </div>
        <TableContainer className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 900 }}>
          <Table stickyHeader className="min-w-[900px]">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  ลำดับ
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  ที่อยู่
                </TableCell>
                <TableCell
                  sx={{backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  ชนิดไม้
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  ทะเบียนรถ
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  น้ำหนัก
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  ราคา
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  จ่ายบิล
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#FFD580", border: "1px solid #ccc" }}
                >
                  วันที่
                </TableCell>
              </TableRow>
            </TableHead>
           <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ padding: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.address}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.woodType}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.carNumber}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.weight}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.payBill}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#f3f3f3" }}>
                    {item.dateAt}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DataPage;
