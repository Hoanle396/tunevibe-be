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
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.mongoUri,
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
      ],
    }),
    UsersModule,
    MusicsModule,
    AlbumModule,
    ArtistModule,
    RatingModule,
    PlaylistModule,
    InteractionModule,
  ],
})
export class AppModule {}
