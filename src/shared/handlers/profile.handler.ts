import { Injectable } from '@nestjs/common';
import { ProfileType } from '../constants/profile.enum';

@Injectable()
export class ProfileHandler {

    async getProfileName(profile: string) {
        
        switch (profile) {
            case ProfileType.Admin:
                return 'Admin';
            case ProfileType.Financial:
                return 'Financeiro';
            case ProfileType.Moderator:
                return 'Moderador';
            case ProfileType.Member:
                return 'Membro';
            default:
                return '';
        }
    }

}
