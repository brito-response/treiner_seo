import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Partnership} from './entities/partnerships.entity';
import { PartnershipsRepository } from './repository/partnerships.repository';
import { ApiError } from 'src/common/errors/api-error.class';
import { CreatePartnershipDto, UpdatePartnershipDto } from './dto';

@Injectable()
export class PartnershipsService extends BaseService<Partnership, CreatePartnershipDto, UpdatePartnershipDto> {
  constructor(private readonly partnershipsRepository: PartnershipsRepository) {
    super(partnershipsRepository);
  }
 
  async addPhotoOfPartnership(id: string, newImage: string) {
    const post = await this.partnershipsRepository.getInstanceOfPostById(id);
    if (!post) throw new ApiError('Partnership not found', 404);
    post.logo = newImage;
    await post.save();
    return post;
  }
}
