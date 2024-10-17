      import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,

  Body,
  Patch,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-users.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/acess-token/acess-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id?')
  // for api level descrption in swagger
  @ApiOperation({
    summary:"fetches all users ",
    description:"fetches all users in users appliction "// this is added below 
  })

  // for query in swagger documentation
  @ApiQuery(
    {
      name:'limit',
      type:'number',
      required:false,
      description:'The number of entries returned per query',
    example:10,
    }
  )

  @ApiQuery(
    {
      name:'page',
      type:'number',
      required:false,
      description:'The postion of page number that you want API to return',
    example:1,
    }
  )
  @ApiResponse({
    status:200,
  })
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ) {
    console.log(getUserParamDto);

    return this.usersService.findAllUsers(getUserParamDto, limit, page);
  }

  @Post()
 // @SetMetadata('authtype','none')
 @Auth(AuthType.None)
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(typeof createUserDto, createUserDto instanceof CreateUserDto);
    return this.usersService.createUser(createUserDto);
  }
@UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUser(@Body() createUsersDto: CreateUserDto[]) {
    console.log(typeof createUsersDto, createUsersDto instanceof CreateUserDto);
    return this.usersService.createManyUsers(createUsersDto);
  }
  @Patch()
  public patchUser(@Body() patchUser: PatchUserDto) {
    console.log(patchUser);

    return patchUser;
  }
}
