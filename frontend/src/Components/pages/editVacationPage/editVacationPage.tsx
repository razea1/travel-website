import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./editVacationPage.css";

interface IVacation {
  idVacation: number | undefined;
  destination: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  img: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function EditVacationPage(): JSX.Element {
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [startOn, setStartOn] = useState("");
  const [endOn, setEndOn] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vacationId = queryParams.get("idVacation");

  useEffect(() => {
    if (vacationId) {
      axios
        .get(`http://localhost:3001/api/vacations/${vacationId}`)
        .then((response) => {
          const vacationData = response.data;
          setDestination(vacationData.destination);
          setDescription(vacationData.description);
          setStartOn(formatDate(vacationData.dateStart)); // Convert to desired format
          setEndOn(formatDate(vacationData.dateEnd)); // Convert to desired format
          setPrice(vacationData.price.toString());
          setImg(vacationData.img);
        })
        .catch((error) => {
          console.error("Error fetching vacation data:", error);
        });
    }
  }, [vacationId]);

  const { register } = useForm();
  const navigate = useNavigate();

  const handleImgBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value);
  };

  const makeAddVacation = () => {
    if (!destination || !description || !startOn || !endOn || !price || !img) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (Number(price) < 0) {
      setErrorMessage("Cannot input a negative value for price.");
      return;
    }

    if (Number(price) > 10000) {
      setErrorMessage("Even Jeff Bezos wouldn't take this trip!");
      return;
    }

    if (new Date(endOn).getTime() < new Date(startOn).getTime()) {
      setErrorMessage("End date cannot be before start date.");
      return;
    }

    if (new Date(startOn).getTime() < Date.now()) {
      setErrorMessage("Cannot set a date before the current time.");
      return;
    }

    const data: IVacation = {
      destination: destination,
      description: description,
      dateStart: startOn,
      dateEnd: endOn,
      price: Number(price),
      img: img,
      idVacation: vacationId ? Number(vacationId) : undefined,
    };

    if (vacationId) {
      axios
        .put(`http://localhost:3001/api/vacations/${vacationId}`, data)
        .then((response) => {
          console.log("Vacation updated successfully!");
          setSuccessMessage("Vacation updated successfully!");
          setDestination("");
          setDescription("");
          setStartOn("");
          setEndOn("");
          setPrice("");
          setImg("");
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Error updating vacation.");
        });
    } else {
      axios
        .post("http://localhost:3001/api/vacations", data)
        .then((response) => {
          console.log("Vacation added successfully!");
          setSuccessMessage("Vacation added successfully!");
          setDestination("");
          setDescription("");
          setStartOn("");
          setEndOn("");
          setPrice("");
          setImg("");
          setErrorMessage("");
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 409) {
            setErrorMessage("Vacation is already added.");
          } else {
            setErrorMessage("Error adding vacation.");
          }
        });
    }
  };

  return (
    <div className="editVacationPage">
      <form>
        <h2>{vacationId ? "Edit Vacation" : "Add Vacation"} Form:</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <br />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <input type="date" placeholder="Start Date" value={startOn} onChange={(e) => setStartOn(e.target.value)} required />
        <br />
        <input type="date" placeholder="End Date" value={endOn} onChange={(e) => setEndOn(e.target.value)} required />
        <br />
        <input type="number" placeholder="$" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <input type="url" placeholder="Enter Image URL" {...register("URL")} onBlur={handleImgBlur} />
        <br />
        <button type="button" onClick={makeAddVacation}>
          {vacationId ? "Update Vacation" : "Add Vacation"}
        </button>
        <br />
        <NavLink to="/adminVacationPage">
          <button type="button">Cancel</button>
        </NavLink>
      </form>

      {img && (
        <div className="image-preview">
          <h3>Image Preview</h3>
          <img src={img} alt="Vacation Preview" />
        </div>
      )}
    </div>
  );
}

export default EditVacationPage;
