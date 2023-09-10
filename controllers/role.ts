import { USER } from "../@types/user.js";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { In } from "typeorm";
import { User } from "../db/entities/User.js";



const insertRole = async (payload: USER.Role) => {
  try {
    const role = new Role();
    role.name = payload.name;
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    await role.save();
    return role;
  } catch (error) {
    console.log(error);

    throw ("Something went wrong");
  }
}

const assignRole = async(payload:any) => {
    try {
      const role = await Role.findOneBy({
        name:payload.name
      })
      if(role){
        const user = new User();
        user.roles.push(role)
        await user.save();
        return user;  
      }
      else return false;
    } catch (error) {
      throw ("Something went wrong");
    }
  }
  
  


export {
  insertRole,
  assignRole
}