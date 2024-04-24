import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(public filePath: string) {
    let file: Buffer | undefined;
    try {
      file = fs.readFileSync(filePath);
    } catch (error) {
      file = fs.readFileSync('development.env');
    }

    const config = dotenv.parse(file);
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      MYSQL_HOST: Joi.string().required(),
      MYSQL_DB: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_AUTH_ENABLED: Joi.boolean().default(false),
      MYSQL_USER: Joi.string(),
      MYSQL_PASSWORD: Joi.string().allow(null),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES_IN: Joi.number(),
    });

    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(
        `Config validation error in your env file: ${error.message}`
      );
    }
    return validatedEnvConfig;
  }

  get jwtExpiresIn(): number | undefined {
    if (this.envConfig.JWT_EXPIRES_IN) {
      return +this.envConfig.JWT_EXPIRES_IN;
    }
    return undefined;
  }

  get mysqlHost(): string {
    return this.envConfig.MYSQL_HOST;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get mysqlUser(): string | undefined {
    return this.envConfig.MYSQL_USER;
  }

  get mysqlPassword(): string | undefined {
    return this.envConfig.MYSQL_PASSWORD;
  }

  get mysqlDatabase(): string | undefined {
    return this.envConfig.MYSQL_DB;
  }

  get mysqlPort(): number | undefined {
    return Number(this.envConfig.MYSQL_PORT);
  }
}
