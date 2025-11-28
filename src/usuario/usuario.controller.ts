import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { SignUpDto, SignInDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UserGuard } from './usuario.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.usuarioService.signup(signUpDto);
  }

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return this.usuarioService.signin(signInDto);
  }

  @UseGuards(UserGuard)
  @Get('user')
  async me(@Request() request) {
    return request.user;
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
