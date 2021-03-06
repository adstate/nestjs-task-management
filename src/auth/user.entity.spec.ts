import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User Entity', () => {
    let user: User;

    beforeEach(() => {
        user = new User();
        user.password = 'testHashedPassword';
        user.salt = 'testSalt';
        bcrypt.hash = jest.fn();
    });

    describe('validatePassword', () => {
        it('returns true as password is valid', async () => {
            bcrypt.hash.mockReturnValue('testHashedPassword');

            expect(bcrypt.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('testHashedPassword');

            expect(bcrypt.hash).toHaveBeenCalledWith('testHashedPassword', 'testSalt');
            expect(result).toEqual(true);
        });

        it('returns false as password is invalid', async () => {
            bcrypt.hash.mockReturnValue('wrongPassword');

            expect(bcrypt.hash).not.toHaveBeenCalled();

            const result = await user.validatePassword('wrongPassword');

            expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', 'testSalt');
            expect(result).toEqual(false);
        });
    });
});
