import { USER } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import { Role } from "../db/entities/Role.js";
import { In } from "typeorm";

const insertUser = async(payload: USER.Item) => {
  try {
    const user = new User();
    user.userName = payload.userName;
    user.email = payload.email;
    user.password = payload.password;
    user.roles = await Role.findBy({
      id: In(payload.role)
    });
    await user.save();
    return user;  
  } catch (error) {
    throw ("Something went wrong");
  }
}

const getUser = (userName:string) => {
  return User.findBy({
    userName:userName
  });
}




export {
  insertUser,
  getUser
}