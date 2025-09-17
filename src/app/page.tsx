import { ToastContainer } from "react-toastify";
import HomePage from "./home/page";

export default function Main() {
  return (
 <>
 <HomePage />
 <ToastContainer position="top-right" autoClose={3000} theme="colored" />
 </>  
  );
}
