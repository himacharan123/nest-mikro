import { Controller, Post,Body } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './provider/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(
        private readonly metaOPtionsService:MetaOptionsService
    ){

    }
    @Post()
    public create(@Body() createPostMetaOptionsDto:CreatePostMetaOptionsDto){
return this.metaOPtionsService.create(createPostMetaOptionsDto);
    }
    
}
