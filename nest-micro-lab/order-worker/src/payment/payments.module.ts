import { Module, forwardRef } from "@nestjs/common"
import { OrdersModule } from "src/orders/orders.module";
import { PaymentsService } from "./payments.service";
import { OrdersService } from "src/orders/orders.service";

@Module({
    imports:[forwardRef(() => OrdersModule)],
    providers:[PaymentsService],
    controllers: [],
    exports: [PaymentsService]
})
export class PaymentsModule{}