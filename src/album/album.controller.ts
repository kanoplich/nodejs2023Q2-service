import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (
      !createAlbumDto.name ||
      typeof createAlbumDto.year !== 'number' ||
      !createAlbumDto.hasOwnProperty('artistId')
    ) {
      throw new BadRequestException();
    } else {
      return await this.albumService.create(createAlbumDto);
    }
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.albumService.findOne(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.update(uuid, updateAlbumDto);
    } catch (e) {
      if (e.message === 'Bad request') {
        throw new BadRequestException();
      } else {
        throw new NotFoundException();
      }
    }
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return await this.albumService.remove(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}
