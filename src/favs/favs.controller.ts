import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:uuid')
  createTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.createTrack(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('album/:uuid')
  createAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.createAlbum(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('artist/:uuid')
  createArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.createArtist(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('track/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.removeTrack(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete('album/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.removeAlbum(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete('artist/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.favsService.removeArtist(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}
