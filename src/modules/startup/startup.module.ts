import { Module } from '@nestjs/common';
import { StartupService } from 'src/modules/startup/startup.service';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [StartupService],
})
export class StartupModule {}
