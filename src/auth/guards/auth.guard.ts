import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

interface JwtPayload {
    sub: number; // Replace with the correct type for user ID
    username: string; // Replace with the correct type for username
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);
            request.user = {
                userId: tokenPayload.sub,
                email: tokenPayload.username,
            };
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
