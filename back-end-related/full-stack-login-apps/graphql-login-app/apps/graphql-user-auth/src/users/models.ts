import { users, authInfo } from 'src/drizzle/schema';

export type UserModel = typeof users.$inferSelect;
export type AuthInfoModel = typeof authInfo.$inferInsert;
