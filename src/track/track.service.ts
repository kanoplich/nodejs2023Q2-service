import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const artists = this.artistService.findAll();
    const artist = artists.find(
      (artist) => artist.id === createTrackDto.artistId,
    );

    const albums = this.albumService.findAll();
    const album = albums.find((album) => album.id === createTrackDto.albumId);

    const track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: artist ? artist.id : null,
      albumId: album ? album.id : null,
      duration: createTrackDto.duration,
    };

    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      return track;
    } else {
      throw new Error();
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (
      !updateTrackDto.name ||
      typeof updateTrackDto.duration !== 'number' ||
      !updateTrackDto.hasOwnProperty('artistId') ||
      !updateTrackDto.hasOwnProperty('albumId')
    ) {
      throw new Error('Bad request');
    }
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex !== -1) {
      const artists = this.artistService.findAll();
      const artist = artists.find(
        (artist) => artist.id === updateTrackDto.artistId,
      );

      const albums = this.albumService.findAll();
      const album = albums.find((album) => album.id === updateTrackDto.albumId);

      const track = {
        ...this.tracks[trackIndex],
        name: updateTrackDto.name,
        artistId: artist ? artist.id : null,
        albumId: album ? album.id : null,
        duration: updateTrackDto.duration,
      };

      this.tracks.splice(trackIndex, 1, track);

      return track;
    } else {
      throw new Error();
    }
  }

  remove(id: string) {
    const trackIndex = this.tracks.findIndex((album) => album.id === id);
    if (trackIndex !== -1) {
      this.tracks.splice(trackIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }

  changeTrackAlbumId(id: string) {
    for (const track of this.tracks) {
      if (track.albumId === id) {
        track.albumId = null;
      }
    }
  }

  changeTrackArtistId(id: string) {
    for (const track of this.tracks) {
      if (track.artistId === id) {
        track.artistId = null;
      }
    }
  }
}
