import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs_albums')
export class FavAlbums {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  albumId: string;
}
