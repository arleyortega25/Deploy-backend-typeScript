import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service' 
import { UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
export class UserService extends BaseService<UserEntity>{
    constructor(){
        super(UserEntity)

    }
    async findUserAll():Promise<UserEntity[]>{
        return (await this.execRepository).find()
    }
    async findUserById(id: string):Promise<UserEntity | null>{
        return (await this.execRepository).findOne({where:{id}})

    }
    async createUser(body:UserDTO): Promise<UserEntity>{
        const newUser = (await this.execRepository).create(body);
        return (await this.execRepository).save(newUser)
        
    }
    async deleteUser(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updateUser(id: string,infoUpdate:UserDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id,infoUpdate)
    }

}