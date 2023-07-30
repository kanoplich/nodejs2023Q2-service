import { Track } from 'src/track/interfaces/track.interface';
import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
