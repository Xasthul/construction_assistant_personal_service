import * as bcrypt from 'bcryptjs';

export default async function generatePasswordHash (password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
