import { USER } from "../@types/user.js";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { Any, In } from "typeorm";
import { User } from "../db/entities/User.js";



const insertRole = async (payload: USER.Role) => {
  try {
    const role = new Role();
    
    role.name = payload.name;
    role.permissions= await Permission.findBy({
        id:In(payload.permissions)
    });
    console.log(role.permissions)
    // role.permissions = permissions.map(permission => permission.id);
      await role.save();
      return role;
  } catch (error) {
    console.log(error);

    throw ("Something went wrong");
  }
}

const assignRole = async(payload:any) => {
      console.log(payload);
      // if(role){
        const user = await User.findOneBy({
          userName:payload.userName
        });
        console.log(user);
        if(user){
          const role = await Role.findOneBy({
            name:payload.role
          })
          console.log(role);
          if(role){
             const checkRoles = user.roles.find((role1)=>role1.name ===role.name )
            console.log(checkRoles)
            if(!checkRoles){
              user.roles.push(role);
              await user.save();
              return user; 
            }else throw ("User already have this role!");
          }else throw ("role not found!");
        }else  throw ("user not found");

  }
  
  


export {
  insertRole,
  assignRole
}