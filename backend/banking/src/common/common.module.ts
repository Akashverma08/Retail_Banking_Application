import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule,ConfigService} from "@nestjs/config"
import {JwtAuthGuard} from "./guards/jwt-auth.guard.js";
import { RolesGuard } from "./guards/roles.guard.js";;

@Module({
    imports:[
        JwtModule.registerAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                  expiresIn: '1h',
                },
              }),
            }),
    ],
    providers:[JwtAuthGuard, RolesGuard],
    exports:[JwtModule,JwtAuthGuard, RolesGuard]
})

export class CommonModule{}