import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./Components/Routing/mainRoute/mainRoute";
import VacationsPage from "./Components/pages/VacationsPage/VacationsPage";
import EditVacationPage from "./Components/pages/editVacationPage/editVacationPage";
import VacationsReportPage from "./Components/pages/VacationReportPage/VacationReportPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <MainRoute />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
