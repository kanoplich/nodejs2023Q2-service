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
  async createTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.createTrack(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('album/:uuid')
  async createAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.createAlbum(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Post('artist/:uuid')
  async createArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.createArtist(uuid);
    } catch {
      throw new HttpException(
        "Track with id doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Delete('track/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.removeTrack(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete('album/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.removeAlbum(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete('artist/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.favsService.removeArtist(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}
