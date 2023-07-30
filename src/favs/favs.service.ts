import { Injectable } from '@nestjs/common';
import { Favorites } from './interfaces/favs.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavDto } from './dto/fav.dto';

@Injectable()
export class FavsService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  createTrack(id: string) {
    const tracks = this.trackService.findAll();
    const track = tracks.find((track) => track.id === id);

    if (track) {
      this.favorites.tracks.push(track);
      return;
    } else {
      throw new Error();
    }
  }

  createAlbum(id: string) {
    const albums = this.albumService.findAll();
    const album = albums.find((album) => album.id === id);

    if (album) {
      this.favorites.albums.push(album);
      return;
    } else {
      throw new Error();
    }
  }

  createArtist(id: string) {
    const artists = this.artistService.findAll();
    const artist = artists.find((artist) => artist.id === id);

    if (artist) {
      this.favorites.artists.push(artist);
      return;
    } else {
      throw new Error();
    }
  }

  findAll() {
    return this.favorites;
  }

  findOne(FavDto: FavDto) {
    const artist = this.favorites.artists.find(
      (artist) => artist.id === FavDto.id,
    );
    const album = this.favorites.albums.find((album) => album.id === FavDto.id);
    const track = this.favorites.tracks.find((track) => track.id === FavDto.id);

    // return artist ? artist : album ? album : track ? track : new Error();
    if (artist) {
      return artist;
    } else if (album) {
      return album;
    } else if (track) {
      return track;
    } else {
      throw new Error();
    }
  }

  removeTrack(id: string) {
    const trackIndex = this.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIndex !== -1) {
      this.favorites.tracks.splice(trackIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }

  removeAlbum(id: string) {
    const albumIndex = this.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex !== -1) {
      this.favorites.albums.splice(albumIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }

  removeArtist(id: string) {
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex !== -1) {
      this.favorites.artists.splice(artistIndex, 1);
      return null;
    } else {
      throw new Error();
    }
  }
}
