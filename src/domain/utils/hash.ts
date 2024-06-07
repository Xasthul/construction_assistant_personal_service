import * as bcrypt from 'bcryptjs';

export async function generateHashFor (string: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(string, salt);
}

export async function comparStringWithHash (string: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(string, hash);
}
