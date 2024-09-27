import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        ThirdPartyPasswordless.init({
          flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
          contactMethod: 'EMAIL_OR_PHONE',
          providers: [
            {
              // https://console.cloud.google.com/apis/credentials?hl=en&project=bmm20-serhii-project
              config: {
                thirdPartyId: 'google',
                clients: [
                  {
                    clientId:
                      '683274934185-dmk54aa8p0cto8jplhgiahsi7g9ednh2.apps.googleusercontent.com',
                    clientSecret: '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',
                  },
                ],
              },
            },
            {
              // https://github.com/settings/applications/2353817
              config: {
                thirdPartyId: 'github',
                clients: [
                  {
                    clientId: '7254979ca64e8b578c30',
                    clientSecret: '0f6484bdaefc48518ea536b2a19dc35829e8cbdd',
                  },
                ],
              },
            },
          ],
        }),
        Session.init(),
        Dashboard.init(),
      ],
    });
  }
}
