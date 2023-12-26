import { DataSource, EntityManager } from 'typeorm';
import { environment } from './environmet';
import { User } from '../../src/entities/users.entity';
import { Cart } from '../../src/entities/carts.entity';
import { CartItem } from '../../src/entities/cart_items.entity';

let dataSource: DataSource;

const getDatabaseConnection = async (): Promise<EntityManager> => {
  if (dataSource && dataSource.isInitialized) {
    console.log('Already Connection Created! Using Same Connection!');
    return dataSource.manager;
  } else {
    console.log('No DB Connection Found! Creating New Connection!');
    dataSource = new DataSource({
      type: 'postgres',
      host: environment.DATABASE_HOST,
      port: +environment.DATABASE_PORT,
      username: environment.DATABASE_USERNAME,
      password: environment.DATABASE_PASSWORD,
      database: environment.DATABASE_NAME,
      connectTimeoutMS: 30000,
      synchronize: true,
      useUTC: true,
      entities: [User, Cart, CartItem],
    });
    return await dataSource
      .initialize()
      .then(() => {
        console.trace('New DB Created!');
        return dataSource.manager;
      })
      .catch((e) => {
        console.debug(e, 'Error Occured in DB creation');
        throw new Error(e);
      });
  }
};
export { getDatabaseConnection };
