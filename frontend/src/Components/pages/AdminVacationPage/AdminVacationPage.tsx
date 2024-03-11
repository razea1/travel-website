import { Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { CSVLink, CSVDownload } from "react-csv";
import "./AdminVacationPage.css";

interface IVacation {
  idVacation: number;
  destination: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  img: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

interface AdminVacationPageProps {
  // Add any necessary props
}

function AdminVacationPage(props: AdminVacationPageProps): JSX.Element {
  const [vacations, setVacation] = useState<IVacation[]>([]);
  const myURL = "http://localhost:3001/api/vacations";
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    axios.get<IVacation[]>(myURL).then((response) => {
      setVacation(response.data);
    });
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(vacations.length / postsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Function to handle vacation delete
  const handleVacationDelete = (idVacation: number) => {
    // Show a confirmation window to the user
    const confirmDelete = window.confirm("Are you sure you want to delete this vacation?");

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/api/vacation/${idVacation}`)
        .then((response) => {
          // Vacation deleted successfully, update the list of vacations
          setVacation((prevVacations) => prevVacations.filter((vacation) => vacation.idVacation !== idVacation));
        })
        .catch((error) => {
          console.error("Error deleting vacation", error);
          // Handle error if delete request fails
        });
    } else {
      // If the user cancels, do nothing
      return;
    }
  };

  // Use the useNavigate hook to access the navigation function
  const navigate = useNavigate();

  // Function to handle vacation edit
  const handleVacationEdit = (idVacation: number) => {
    // Find the vacation object with the corresponding idVacation
    const vacationToEdit = vacations.find((vacation) => vacation.idVacation === idVacation);
    if (vacationToEdit) {
      // Use the navigate function to navigate to the edit page with the correct vacation data as a query parameter
      navigate(`/editVacationPage?idVacation=${idVacation}`, { state: { vacation: vacationToEdit } });
    }
  };

  return (
    <div className="header">
      <h2 className="header1">admin page:</h2>
      <NavLink className="NavButton" to="/">
        <button>log out</button>
      </NavLink>
      <NavLink className="NavButton" to="/addVacationPage">
        <button>add Vacation</button>
      </NavLink>
      <NavLink className="NavButton" to="/VacationReportPage">
        <button>Vacation Page Report</button>
      </NavLink>
      <div className="AdminVacationPage box">
        {currentPosts.map((vacation) => (
          <div className="Box-item-admin" key={vacation.idVacation}>
            <h3>destination: {vacation.destination}</h3>
            <br />
            <h4>description:</h4>
            {vacation.description}
            <br />
            <h4>dateStart:</h4>
            {formatDate(vacation.dateStart)}
            <br />
            <h4>dateEnd:</h4>
            {formatDate(vacation.dateEnd)}
            <br />
            <h4>price:</h4>
            <h1>{vacation.price}$</h1>
            <br />
            <div className="img">
              <img src={vacation.img} alt={vacation.destination} />
            </div>
            {/* Add the delete and edit buttons */}
            <div className="buttons">
              <button onClick={() => handleVacationDelete(vacation.idVacation)}>Delete</button>
              {/* Use the handleVacationEdit function to handle the edit navigation */}
              <button onClick={() => handleVacationEdit(vacation.idVacation)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-admin">
        <Stack spacing={2}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
      </div>
      <CSVLink data={vacations}>Download CSV file here</CSVLink>
    </div>
  );
}

export default AdminVacationPage;
