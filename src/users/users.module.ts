import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService], // Add UsersService here
  exports: [UsersService],   // Export UsersService for use in other modules
})
export class UsersModule {}
