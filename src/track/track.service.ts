import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const artist = createTrackDto.artistId
      ? await this.artistService.findArtist(createTrackDto.artistId)
      : null;

    const album = createTrackDto.albumId
      ? await this.albumService.findAlbum(createTrackDto.albumId)
      : null;

    const track = {
      name: createTrackDto.name,
      artistId: artist ? artist.id : null,
      albumId: album ? album.id : null,
      duration: createTrackDto.duration,
    };

    const createTrack = this.tracksRepository.create(track);
    return await this.tracksRepository.save(createTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) return track;

    throw new Error();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (
      !updateTrackDto.name ||
      typeof updateTrackDto.duration !== 'number' ||
      !updateTrackDto.hasOwnProperty('artistId') ||
      !updateTrackDto.hasOwnProperty('albumId')
    ) {
      throw new Error('Bad request');
    }
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      const artist = updateTrackDto.artistId
        ? await this.artistService.findArtist(updateTrackDto.artistId)
        : null;

      const album = updateTrackDto.albumId
        ? await this.albumService.findAlbum(updateTrackDto.albumId)
        : null;

      await this.tracksRepository.update(id, {
        name: updateTrackDto.name,
        artistId: artist ? artist.id : null,
        albumId: album ? album.id : null,
        duration: updateTrackDto.duration,
      });

      return await this.tracksRepository.findOne({ where: { id } });
    } else {
      throw new Error();
    }
  }

  async remove(id: string) {
    const removed = await this.tracksRepository.delete(id);
    if (removed.affected === 0) throw new Error();
    return null;
  }

  async changeTrackAlbumId(id: string) {
    const tracks = await this.tracksRepository.find();
    for (const track of tracks) {
      if (track.albumId === id) {
        await this.tracksRepository.update(track.id, {
          albumId: null,
        });
      }
    }
  }

  async changeTrackArtistId(id: string) {
    const tracks = await this.tracksRepository.find();
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.tracksRepository.update(track.id, {
          artistId: null,
        });
      }
    }
  }

  async findTrack(id: string) {
    return await this.tracksRepository.findOne({ where: { id } });
  }
}
