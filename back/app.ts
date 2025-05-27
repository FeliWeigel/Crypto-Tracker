import { envs } from "./src/config/envs"
import { AppRoutes } from "./src/routes/routes.routes"
import { Server } from "./src/server/server"

//funcion auto invocada
(async() => {
    main()
})()

function main(){
    const server = new Server(
        {
            port: envs.PORT, 
            routes: AppRoutes.routes
        }
    )

    server.start()
}