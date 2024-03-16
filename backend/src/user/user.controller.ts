import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleName, User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id/activate')
  activateUser(@Param('id') id: string): Observable<UpdateResult> {
    return this.userService.activateUser(id);
  }

  @ApiBearerAuth()
  @Role(RoleName.SUDO)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id/change-roles')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: [String], description: 'Array of roles to assign' })
  @ApiResponse({ status: 200, description: 'User roles changed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changeRoles(
    @Param('id') id: string,
    @Body() roles: RoleName[],
  ): Observable<UpdateResult> {
    return this.userService.update(id, { roles });
  }

  @ApiBearerAuth()
  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post(':id/add-to-favourite/:movieId')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie added to favourites successfully',
  })
  @ApiResponse({ status: 404, description: 'User or movie not found' })
  addMovieToFavourite(
    @Param('id') userId: string,
    @Param('movieId') movieId: string,
  ): Observable<User | UpdateResult> {
    return this.userService.addMovieToFavourite(userId, movieId);
  }

  @ApiBearerAuth()
  @Role(RoleName.MODERATOR, RoleName.ADMIN, RoleName.USER)
  @UseGuards(AuthGuard, RoleGuard)
  @Post(':id/delete-from-favourite/:movieId')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiParam({ name: 'movieId', description: 'Movie ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie removed from favourites successfully',
  })
  @ApiResponse({ status: 404, description: 'User or movie not found' })
  removeMovieFromFavourite(
    @Param('id') userId: string,
    @Param('movieId') movieId: string,
  ): Observable<User | UpdateResult> {
    return this.userService.removeMovieFromFavourite(userId, movieId);
  }
}
