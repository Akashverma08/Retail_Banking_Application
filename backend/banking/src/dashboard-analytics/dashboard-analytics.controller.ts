import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard.js";
import {RolesGuard} from "../common/guards/roles.guard.js"
import {DashboardAnalyticsService} from "./dashboard-analytics.service.js";
import { Roles } from '../common/decorators/roles.decorator.js';
  
@Controller('dashboard-analytics')
export class DashboardAnalyticsController {
    constructor(private readonly dashboardAnalyticsSerices:DashboardAnalyticsService){}

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles("Admin")
    @Get('/admin')
    async getAdminDashboard(){
        return this.dashboardAnalyticsSerices.getAdminDashboard();

    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles("Customer")
    @Get('/customer')
    async getCustomerDashboard(@Req() req:any){
        return this.dashboardAnalyticsSerices.getCustomerDashboard(req.user.sub);
        
    }
}
