import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

@Module({
    imports: [MikroOrmModule.forFeature([])],
    providers: [],
    controllers: []
})

class OrmModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply() // Applique le middleware
            .forRoutes();
    }
}
export { OrmModule }