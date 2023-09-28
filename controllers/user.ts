import { USER } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import { Role } from "../db/entities/Role.js";
import { In } from "typeorm";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const insertUser = async(payload: USER.Item) => {
  try {
    const user = new User();
    user.userName = payload.userName;
    user.email = payload.email;
    user.password = payload.password;

    user.roles = await Role.findBy({
      id: In(payload.role)
    });
    // user.roles =roles.map(role => role.id);
    
    
    await user.save();
    return user;  
  } catch (error) {
    throw ("Something went wrong");
  }
}



const getUsers = async (userName:string) => {
  return await User.findOneBy({
        userName
      });
}

const login = async (email: string, password: string) => {
    
    const user = await User.findOneBy({
      email
    });
    console.log(email,password,user);
    const passwordMatching = await bcrypt.compare(password, user?.password ||'');

    if (user && passwordMatching) {
      const token =
      jwt.sign({ email: user.email,
          userName: user.userName }, process.env.JWT_SECRET_KEY ||'', {
        expiresIn:"30m",
      });

      return token;
    } else {
      throw ("somethin gwent wrong!");
    }

}



export {
  insertUser,
  getUsers,
  login
}