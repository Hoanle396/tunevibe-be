import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { ConfigService } from './config/config.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { MusicsModule } from './modules/music/musics.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { RatingModule } from './modules/rating/rating.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { InteractionModule } from './modules/interaction/interaction.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from './schemas/user.schema';
import { Music } from './schemas/music.schema';
import { Album } from './schemas/album.schema';
import { Artist } from './schemas/artist.schema';
import { Bio } from './schemas/bio.schema';
import { Comment } from './schemas/comment.schema';
import { Vote } from './schemas/vote.schema';
import { PlayList } from './schemas/playlist.schema';
import { Interaction } from './schemas/interaction.schema';
import { Play } from './schemas/play.schema';
import { PlayListMusic } from './schemas/playlist-music.schema';
import { Transaction } from './schemas/transaction.schema';
import { TransactionModule } from './modules/transaction/transaction.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.mysqlHost,
        port: configService.mysqlPort,
        username: configService.mysqlUser,
        password: configService.mysqlPassword,
        database: configService.mysqlDatabase,
        entities: [
          Users,
          Music,
          Album,
          Artist,
          Bio,
          Comment,
          Vote,
          PlayList,
          Interaction,
          Play,
          Transaction
        ],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      include: [
        UsersModule,
        MusicsModule,
        AlbumModule,
        ArtistModule,
        RatingModule,
        PlaylistModule,
        InteractionModule,
        TransactionModule
      ],
    }),
    UsersModule,
    MusicsModule,
    AlbumModule,
    ArtistModule,
    RatingModule,
    PlaylistModule,
    InteractionModule,
    TransactionModule,
  ],
})
export class AppModule {}
