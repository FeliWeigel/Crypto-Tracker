import { Request } from "express"
import { Response } from "express"
import { prisma } from "../../prisma"
import bcrypt from "bcrypt"

export class UserController {
    constructor(){

    }

    public getUsers = async (req: Request, res: Response) => {
        try{
            const users = await prisma.user.findMany()

            res.status(200).json(users)
        }catch(err){
            console.log(err)
            res.status(500).json({message:"error al obtener los usuarios", err})
        }
    }

    //public getUserProfile = async (req: Request, res: Response) => {
      //  try {
        //    const user 
        //}
    //}

    private isValidPass(password: string): boolean {
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return regex.test(password);   
    }

    public registerUser = async (req: Request, res: Response) => {
        try{
            const {firstname, lastname, email, password} = req.body

            if(!this.isValidPass(password)){
                res.status(401).json({message: "Incorrect password. Read conditions and try again."})
                return;
            }

            const hashedPass = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: hashedPass
                }
            })

            res.status(200).json({message: "You have successfully registered!"})
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Error to register user", err})
        }
    }
    

    public loginUser =  async (req: Request, res: Response) => {
        try{
            const {email, password} = req.body

            const user = await prisma.user.findUnique({
                where: { email }
            })
            if(!user){
                res.status(401).json({message: "Incorrect email or password"})
                return;
            }

            const isValidPass = await bcrypt.compare(password, user.password)
            if(!isValidPass) {
                res.status(401).json({message: "Incorrect email or password"})
                return;
            }

            res.status(200).json({message: "You have successfully auth."})
        }catch(err){
            console.log(err)
            res.status(500).json({message:"Error to register user", err})
        }
    }
}