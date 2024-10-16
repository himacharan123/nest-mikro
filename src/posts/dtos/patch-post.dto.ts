
import { ApiProperty,PartialType} from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

import { CreatePostDto } from "./create-post.dto";

export class PatchPostDto extends PartialType(CreatePostDto)  {
@ApiProperty({
    description:"id is required for upadating the post "
})
@IsInt()
@IsNotEmpty()
id:number;
}