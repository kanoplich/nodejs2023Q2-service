import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    if (
      !createTrackDto.name ||
      typeof createTrackDto.duration !== 'number' ||
      !createTrackDto.hasOwnProperty('artistId') ||
      !createTrackDto.hasOwnProperty('albumId')
    ) {
      throw new BadRequestException();
    } else {
      return this.trackService.create(createTrackDto);
    }
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.trackService.findOne(uuid);
    } catch {
      throw new NotFoundException();
    }
  }

  @Put(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.update(uuid, updateTrackDto);
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
  remove(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    try {
      return this.trackService.remove(uuid);
    } catch {
      throw new NotFoundException();
    }
  }
}
