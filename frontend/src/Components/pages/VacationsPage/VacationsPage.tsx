import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VacationsPage.css";
import Heart from "react-animated-heart";
import BasicPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IVacation {
  id(id: any): any;
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

function VacationsPage(): JSX.Element {
  const [vacations, setVacation] = useState<IVacation[]>([]);
  const myURL = "http://localhost:3001/api/vacations";
  const followerURL = "http://localhost:3001/api/followers";
  const [likeStatus, setLikeStatus] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [showLikedPosts, setShowLikedPosts] = useState(false); // State for filtering liked posts
  const [followerCount, setFollowerCount] = useState<{ [key: string]: number }>({});
  const [showOngoingTrips, setShowOngoingTrips] = useState(false); // State for filtering ongoing trips
  const [showUpcomingTrips, setShowUpcomingTrips] = useState(false); // State for filtering upcoming trips

  useEffect(() => {
    axios.get<IVacation[]>(myURL).then((response) => {
      // Sort the vacations by start date in ascending order
      const sortedVacations = response.data.sort((a: IVacation, b: IVacation) => {
        const dateA = new Date(a.dateStart);
        const dateB = new Date(b.dateStart);
        return dateA.getTime() - dateB.getTime();
      });

      setVacation(sortedVacations);
      setLikeStatus(new Array(sortedVacations.length).fill(false));
    });
  }, []);

  useEffect(() => {
    // Load user's liked posts from local storage on initial render
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const updatedLikeStatus = likeStatus.map((status, index) => likedPosts.includes(vacations[index].idVacation));
    setLikeStatus(updatedLikeStatus);
  }, []);

  useEffect(() => {
    // Update local storage when likeStatus changes
    const likedPosts = vacations.filter((vacation, index) => likeStatus[index]).map((vacation) => vacation.idVacation);
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likeStatus]);

  //pagnitation
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);

  const handleLikeClick = async (index: number, vacationId: number) => {
    const updatedLikeStatus = [...likeStatus];
    updatedLikeStatus[index] = !updatedLikeStatus[index];
    setLikeStatus(updatedLikeStatus);
    try {
      const storedId = localStorage.getItem("userId") || "";
      const userId = parseInt(storedId);
      const payload = { vacation_code: vacationId, user_code: userId };
      await axios.post(followerURL, payload);
      const { data } = await axios.get(`http://localhost:3001/api/followers/${vacationId}`);
      setFollowerCount((prevFollowerCount) => ({
        ...prevFollowerCount,
        [vacationId]: data.followerCount,
      }));
    } catch (error) {
      console.error("Error fetching follower count", error);
    }
  };

  const totalPages = Math.ceil(vacations.length / postsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleFilterOngoingTrips = () => {
    setShowOngoingTrips(!showOngoingTrips);
  };

  const handleFilterUpcomingTrips = () => {
    setShowUpcomingTrips(!showUpcomingTrips);
  };

  const filteredPosts = showLikedPosts
    ? currentPosts.filter((_, index) => likeStatus[index])
    : showOngoingTrips
    ? currentPosts.filter((vacation) => {
        const currentDate = new Date().getTime();
        const startDate = new Date(vacation.dateStart).getTime();
        const endDate = new Date(vacation.dateEnd).getTime();
        return startDate <= currentDate && currentDate <= endDate;
      })
    : showUpcomingTrips
    ? currentPosts.filter((vacation) => {
        const currentDate = new Date().getTime();
        const startDate = new Date(vacation.dateStart).getTime();
        return startDate > currentDate;
      })
    : currentPosts;

  const handleFilterLikedPosts = () => {
    setShowLikedPosts(!showLikedPosts);
  };

  return (
    <div>
      <h2>vacations:</h2>
      <div className="filter-checkbox">
        <label>
          Show Liked Vacations
          <input type="checkbox" checked={showLikedPosts} onChange={handleFilterLikedPosts} />
        </label>
        <label>
          show upcoming trips
          <input type="checkbox" checked={showUpcomingTrips} onChange={handleFilterUpcomingTrips} />
        </label>
        <label>
          ongoing trips
          <input type="checkbox" checked={showOngoingTrips} onChange={handleFilterOngoingTrips} />
        </label>
      </div>

      <div className="VacationsPage">
        {filteredPosts.map((vacation, index) => (
          <div className="box-item" key={vacation.idVacation}>
            <div className="like-button">
              <Heart isClick={likeStatus[index]} onClick={() => handleLikeClick(index, vacation.idVacation)} />
              <div>{followerCount[vacation.idVacation] || ""}</div>
            </div>
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
          </div>
        ))}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <BasicPagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
      </div>
    </div>
  );
}

export default VacationsPage;
