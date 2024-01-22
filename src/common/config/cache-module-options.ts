import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

const DEFAULT_CACHE_TTL = 5000;

export const cacheOptions = (): CacheModuleAsyncOptions => ({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const ttl = config.get<number>('CACHE_TTL', DEFAULT_CACHE_TTL);
    return { ttl: Number(ttl) };
  },
  inject: [ConfigService],
});
