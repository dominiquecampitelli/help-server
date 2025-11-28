import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(SignUpDto) {}
