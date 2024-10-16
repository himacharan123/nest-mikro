import { Module, Post } from "@nestjs/common";
import { PaginationProvider } from "./provider/pagination.provider";
import { PostsModule } from "src/posts/posts.module";

@Module({
    providers: [PaginationProvider],
    exports:[PaginationProvider],
   
})
export class PaginationModule {}