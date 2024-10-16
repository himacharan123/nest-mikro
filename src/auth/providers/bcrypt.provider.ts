import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(); // to generate salt
    return bcrypt.hash(data, salt);
  }
  comparePassword(data: string | Buffer, enncrypted: string): Promise<boolean> {
    return bcrypt.compare(data, enncrypted);
  }
}
