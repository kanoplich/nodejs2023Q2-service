import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { FavArtists } from './entities/favsArtists.entity';
import { FavAlbums } from './entities/favsAlbums.entity';
import { FavTracks } from './entities/favsTracks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavArtists)
    private favArtistRepository: Repository<FavArtists>,
    @InjectRepository(FavAlbums)
    private favAlbumRepository: Repository<FavAlbums>,
    @InjectRepository(FavTracks)
    private favTrackRepository: Repository<FavTracks>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async createTrack(id: string) {
    const track = await this.trackService.findTrack(id);
    if (track) {
      const createTrack = this.favTrackRepository.create({ trackId: track.id });
      this.favTrackRepository.save(createTrack);
      return;
    }
    throw new Error();
  }

  async createAlbum(id: string) {
    const album = await this.albumService.findAlbum(id);
    if (album) {
      const createAlbum = this.favAlbumRepository.create({ albumId: album.id });
      this.favAlbumRepository.save(createAlbum);
      return;
    }
    throw new Error();
  }

  async createArtist(id: string) {
    const artist = await this.artistService.findArtist(id);

    if (artist) {
      const createArtist = this.favArtistRepository.create({
        artistId: artist.id,
      });
      this.favArtistRepository.save(createArtist);
      return;
    }
    throw new Error();
  }

  async findAll() {
    const [artistsId, albumsId, tracksId] = await Promise.all([
      this.favArtistRepository.find(),
      this.favAlbumRepository.find(),
      this.favTrackRepository.find(),
    ]);

    const artists = await Promise.all(
      artistsId.map(
        async ({ artistId }) => await this.artistService.findArtist(artistId),
      ),
    );

    const albums = await Promise.all(
      albumsId.map(
        async ({ albumId }) => await this.albumService.findAlbum(albumId),
      ),
    );

    const tracks = await Promise.all(
      tracksId.map(
        async ({ trackId }) => await this.trackService.findTrack(trackId),
      ),
    );

    return { artists, albums, tracks };
  }

  async removeTrack(id: string) {
    const track = await this.favTrackRepository.findOne({
      where: { trackId: id },
    });
    if (track) {
      this.favTrackRepository.delete(track.id);
      return null;
    }
    throw new Error();
  }

  async removeAlbum(id: string) {
    const album = await this.favAlbumRepository.findOne({
      where: { albumId: id },
    });
    if (album) {
      this.favAlbumRepository.delete(album.id);
      return null;
    }
    throw new Error();
  }

  async removeArtist(id: string) {
    const artist = await this.favArtistRepository.findOne({
      where: { artistId: id },
    });
    if (artist) {
      this.favArtistRepository.delete(artist.id);
      return null;
    }
    throw new Error();
  }
}
