const UserService = require("../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const initializePassport = (passport) => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await userService.getById(jwt_payload.id);
                if (user === null) {
                    return done(null, false);
                } else return done(null, user);
            } catch (err) {
                done(err, null);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id);
        done(null, user);
    });
};

module.exports = initializePassport;
