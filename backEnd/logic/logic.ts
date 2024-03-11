import { followers } from "./../models/followersModel";
import { vacations } from "./../models/vacationsModel";
import { OkPacket } from "mysql";
import dal from "../utils/dal";
import { siteUsers } from "../models/siteUsersModel";

async function getAllVacations(): Promise<vacations[]> {
  try {
    const sql = "SELECT * FROM vacation.vacations";
    const vacations = await dal.execute(sql);
    return vacations;
  } catch (error) {
    console.error("Error fetching all vacations", error);
    throw error;
  }
}

const updateVacation = async (updatedVacation: vacations) => {
  try {
    const sqlCommand = `
      UPDATE vacation.vacations
      SET 
        destination = '${updatedVacation.destination}',
        description = '${updatedVacation.description}',
        dateStart = '${updatedVacation.dateStart}',
        dateEnd = '${updatedVacation.dateEnd}',
        price = '${updatedVacation.price}',
        img = '${updatedVacation.img}'
      WHERE idVacation = ${updatedVacation.idVacation};
    `;
    await dal.execute(sqlCommand);
  } catch (error) {
    console.error("Error updating vacation", error);
    throw error;
  }
};
async function getVacationById(idVacation: number): Promise<vacations> {
  try {
    const sql = `SELECT * FROM vacation.vacations WHERE idVacation = ${idVacation}`;
    const vacationArray = await dal.execute(sql);
    if (vacationArray.length > 0) {
      return vacationArray[0]; // Return the first (and only) element if it exists
    } else {
      throw new Error("Vacation not found"); // Throw an error if no vacation record is found
    }
  } catch (error) {
    console.error("Error fetching vacation", error);
    throw error;
  }
}

async function addVacation(vacation: vacations): Promise<vacations> {
  try {
    const columns = `destination, description, dateStart, dateEnd, price, img`;
    const values = `'${vacation.destination}','${vacation.description}','${vacation.dateStart}','${vacation.dateEnd}','${
      vacation.price
    }','${encodeURI(vacation.img || "")}'`;
    const sqlCommand = `INSERT INTO vacations (${columns}) VALUES (${values})`;
    const result: OkPacket = await dal.execute(sqlCommand);
    vacation.idVacation = result.insertId;
    return vacation;
  } catch (error) {
    console.error("Error adding vacation", error);
    throw error;
  }
}

async function deleteVacation(idVacation: number): Promise<boolean> {
  try {
    const sql = `DELETE FROM vacations WHERE idVacation = ${idVacation}`;
    const result: OkPacket = await dal.execute(sql);
    return result.affectedRows > 0; // Return true if at least one row was affected (deletion was successful)
  } catch (error) {
    // If an error occurs during the deletion, return false
    console.error("Error deleting vacation", error);
    return false;
  }
}

const addUser = async (newUser: siteUsers) => {
  try {
    const sqlCommand = `
      INSERT INTO siteUsers (user_name, user_lastname, user_email, password, role) 
      VALUES ('${newUser.user_name}', '${newUser.user_lastname}', '${newUser.user_email}', '${newUser.password}', '${newUser.role}');
    `;
    const result: OkPacket = await dal.execute(sqlCommand);
    newUser.id = result.insertId;
    return newUser.id;
  } catch (error) {
    console.error("Error adding user", error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const sqlCommand = `DELETE FROM siteUsers WHERE id=${id}`;
    await dal.execute(sqlCommand);
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

const updateUser = async (updatedUser: siteUsers) => {
  try {
    const sqlCommand = `
      UPDATE siteUsers 
      SET
      user_name = '${updatedUser.user_name}',
      user_lastname = '${updatedUser.user_lastname}',
      user_email = '${updatedUser.user_email}',
      password = '${updatedUser.password}',
      role = '${updatedUser.role}'
      WHERE id = ${updatedUser.id};
    `;
    await dal.execute(sqlCommand);
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

const checkLogin = async (user: siteUsers): Promise<boolean> => {
  try {
    const sqlCommand = `SELECT id FROM siteUsers WHERE user_email='${user.user_email}' AND password='${user.password}'`;
    const result = await dal.execute(sqlCommand);
    if (!result.length) {
      throw new Error("invalid Credintials");
    }
    return result;
  } catch (error) {
    console.error("Error checking login", error);
    throw error; // Re-throw the original error with more information
  }
};

const getUserList = async () => {
  try {
    const sqlCommand = `SELECT id, user_name, user_email FROM siteUsers`;
    const users = await dal.execute(sqlCommand);
    return users;
  } catch (error) {
    console.error("Error fetching user list", error);
    throw error;
  }
};

const test = () => {
  return "all working :)";
};

async function getFollowerByVacation(vacationId: number) {
  try {
    const sql = `SELECT COUNT(*) FROM vacation.Followers WHERE vacation_code = ${vacationId}`;
    const Followers = await dal.execute(sql);
    return Followers;
  } catch (error) {
    console.error("Error fetching all Followers", error);
    throw error;
  }
}

const addFollower = async (newFollower: followers) => {
  try {
    const isAlreadyFollowing = await getFollowerByVacation(newFollower?.vacation_code || 0);
    if (isAlreadyFollowing) {
      return;
    }
    const sqlCommand = `INSERT INTO Followers (user_code, vacation_code)
    VALUES ('${newFollower.user_code}', '${newFollower.vacation_code}');`;
    const result: OkPacket = await dal.execute(sqlCommand);
    newFollower.id = result.insertId;
    return newFollower;
  } catch (error) {
    console.error("Error adding Follower", error);
    throw error;
  }
};

export default {
  addUser,
  deleteUser,
  updateUser,
  checkLogin,
  getUserList,
  test,
  getAllVacations,
  addVacation,
  deleteVacation,
  getFollowerByVacation,
  addFollower,
  getVacationById,
  updateVacation,
};
