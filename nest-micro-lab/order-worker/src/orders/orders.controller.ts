import { Controller, Get, Post, Req, Body, ForbiddenException, BadRequestException, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Notify } from 'src/notifications/notify.decorator';
import { NotifyInterceptor } from 'src/notifications/notify.interceptor';
import { CustomerService } from 'src/customer/customers.service';
import { VerifyCustomerPipe } from 'src/common/pipes/customer-verification.pipe';

@Controller('orders')
@UseInterceptors(NotifyInterceptor)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomerService,
  ) {}

  // Public health check
  @Get('health')
  health() {
    return { ok: true, service: 'order-worker' };
  }
//hasura
  // LIST orders - Pattern B: verify JWT locally
  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req: any) {
    const user = req.user; // comes from JwtStrategy validate()
    // now we trust req.user instead of gateway headers
    return [
      { id: 'o1', userId: user.userId, total: 12.5 },
      { id: 'o2', userId: user.userId, total: 99.0 },
    ];
  }

  // CREATE order - Pattern B: JWT + roles + customer verification + notifications
  @UseGuards(JwtAuthGuard)
  @Post()
  @Notify('orders', 'order_created')
  async create(@Req() req: any, @Body() body: any) {
    const user = req.user; // decoded JWT
    const roles = user.roles || [];

    if (!roles.includes('admin') && !roles.includes('user')) {
      throw new ForbiddenException('Role not allowed');
    }

    // Validate body fields
    const { orderId, item, quantity } = body;
    if (!orderId || !item || !quantity) {
      throw new BadRequestException('orderId, item, and quantity are required');
    }

    // Automatically use the logged-in user as the customer
    const orderDto = {
      orderId,
      item,
      quantity,
      customer: { id: user.userId, name: user.username || user.email }, // from JWT
      userId: user.userId,
    };

    return this.ordersService.createOrder(orderDto);
  }
}
