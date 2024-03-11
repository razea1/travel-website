import "./mainRoute.css";
import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import VacationsPage from "../../pages/VacationsPage/VacationsPage";
import AdminVacationPage from "../../pages/AdminVacationPage/AdminVacationPage";
import AddVacation from "../../pages/addVacation/addVacation";
import EditVacationPage from "../../pages/editVacationPage/editVacationPage";
import VacationReportPage from "../../pages/VacationReportPage/VacationReportPage";

function MainRoute(): JSX.Element {
  return (
    <div className="mainRoute">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/vacationPage" element={<VacationsPage />} />
        <Route path="/AdminVacationPage" element={<AdminVacationPage />} />
        <Route path="/addVacationPage" element={<AddVacation />} />
        <Route path="/editVacationPage" element={<EditVacationPage />} />
        <Route path="/VacationReportPage" element={<VacationReportPage/>}/>
      </Routes>
    </div>
  );
}

export default MainRoute;
