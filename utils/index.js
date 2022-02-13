const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
const JwtStrategy = require('./strategies/jwtStrategy');

//passport utiliza estas dos estrategias y luego se importa al archivo index raíz
passport.use(LocalStrategy);
passport.use(JwtStrategy);

