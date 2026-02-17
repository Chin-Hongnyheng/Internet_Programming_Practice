"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(require('express').json({ limit: '1mb' }));
    const port = process.env.AUTH_PORT ? Number(process.env.AUTH_PORT) : 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Auth service listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map