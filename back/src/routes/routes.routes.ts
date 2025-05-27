import { Router } from "express";
import { userRouter } from "./user/user.routes";
export class AppRoutes {
    static get routes():Router{

        const router = Router()
        router.use("/api/user", userRouter)
        return router;
    }

}