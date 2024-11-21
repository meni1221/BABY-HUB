import fs from "fs";
import bcrypt from "bcrypt";
import Parnts from "../models/ParentsModel";
import Babysitter from "../models/BabysitterModel"; 

/**
 * Encrypts passwords for all users in the provided data array.
 * @param userData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(userData: any[]) {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    })
  );
}

/**
 * Loads initial user data into the database if no users exist.
 * Reads user data from JSON files, encrypts passwords, and inserts data into the database.
 */
async function loadInitialData() {
  // Read user data from JSON files
  const userData = JSON.parse(fs.readFileSync("./data/parnts.json", "utf8"));
  const babySitterData = JSON.parse(fs.readFileSync("./data//babySitter.json", "utf8"));

  if ((await Parnts.countDocuments()) === 0) {
    const encryptedUserData = await encryptPasswords(userData);
    await Parnts.insertMany(encryptedUserData);
    console.log("Initial parents have been added to the database.");
  } else {
    console.log("Parents already exist in the database.");
  }

  if ((await Babysitter.countDocuments()) === 0) {
    const encryptedBabySitterData = await encryptPasswords(babySitterData);
    await Babysitter.insertMany(encryptedBabySitterData);
    console.log("Initial babysitters have been added to the database.");
  } else {
    console.log("Babysitters already exist in the database.");
  }
}

export default loadInitialData;
