import { app } from "./app";

const PORT = process.env.PORT;

async function bootstrap(){
    try {
        app.listen(PORT, () => {
            console.log(`Server listing on ${PORT}`);
        });
    } catch (error) {   
        console.error(`Fail to start server on ${PORT}`);
    }
}

bootstrap();