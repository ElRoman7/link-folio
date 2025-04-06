// src/cache/cache.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis } from '@nestjs/redis';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  // Guardar en cache
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttl); // EX: tiempo en segundos
      this.logger.log(`Set cache for key: ${key}`);
    } catch (error) {
      this.logger.error('Error saving to cache', error);
    }
  }

  // Obtener desde el cache
  async get(key: string): Promise<any | null> {
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.error('Error getting from cache', error);
      return null;
    }
  }

  // Eliminar del cache
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.logger.log(`Deleted cache for key: ${key}`);
    } catch (error) {
      this.logger.error('Error deleting from cache', error);
    }
  }
}
