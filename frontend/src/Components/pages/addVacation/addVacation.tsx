import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useLocation } from "react-router-dom";
import "./addVacation.css";

interface IVacation {
  idVacation: Number;
  destination: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  img: string;
}

function AddVacation(): JSX.Element {
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
  const vacationId = queryParams.get("id");

  useEffect(() => {
    if (vacationId) {
      axios
        .get(`http://localhost:3001/api/vacations/${vacationId}`)
        .then((response) => {
          const vacationData = response.data;
          setDestination(vacationData.destination);
          setDescription(vacationData.description);
          setStartOn(vacationData.dateStart);
          setEndOn(vacationData.dateEnd);
          setPrice(vacationData.price.toString());
          setImg(vacationData.img);
        })
        .catch((error) => {
          console.error("Error fetching vacation data:", error);
        });
    }
  }, [vacationId]);

  const { register } = useForm();

  // Use the useLocation hook to access the state passed from the AdminVacationPage component
  const query = new URLSearchParams(useLocation().search);
  const vacation: IVacation = query.get("vacation") ? JSON.parse(query.get("vacation") as string) : null;

  // If vacation data is available, set the initial form state with vacation data
  React.useEffect(() => {
    if (vacation) {
      setDestination(vacation.destination);
      setDescription(vacation.description);
      setStartOn(vacation.dateStart);
      setEndOn(vacation.dateEnd);
      setPrice(vacation.price.toString());
      setImg(vacation.img);
    }
  }, [vacation]);

  const myURL = "http://localhost:3001/api/vacations";

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
      idVacation: vacation?.idVacation, // Assign the idVacation if it exists or undefined
    };

    // Check if the form is for editing or adding a new vacation
    if (vacation) {
      // If it's editing, make a PUT request
      axios
        .put(`${myURL}/${vacation.idVacation}`, data)
        .then((response) => {
          console.log("Vacation updated successfully!");
          // Show success message
          setSuccessMessage("Vacation updated successfully!");
          // Clear the state after successful update
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
      // If it's adding, make a POST request
      axios
        .post(myURL, data)
        .then((response) => {
          console.log("Vacation added successfully!");
          // Show success message
          setSuccessMessage("Vacation added successfully!");
          // Reset the form after successful submission
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

  const handleImgBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value);
  };

  return (
    <div className="addVacation">
      <form>
        <h2>{vacation ? "Edit Vacation" : "Add Vacation"} Form:</h2>
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
          {vacation ? "Update Vacation" : "Add Vacation"}
        </button>
        <br />
        <NavLink to="/adminVacationPage">
          <button type="button">Cancel</button>
        </NavLink>
      </form>

      {/* Display the image preview here */}
      {img && (
        <div className="image-preview">
          <h3>Image Preview</h3>
          <img src={img} alt="Vacation Preview" />
        </div>
      )}
    </div>
  );
}

export default AddVacation;
