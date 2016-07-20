// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import * as Utils from 'utils/utils.jsx';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import SettingsGroup from './settings_group.jsx';
import TextSetting from './text_setting.jsx';

export default class DataportenSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);

        this.state = Object.assign(this.state, {
            enable: props.config.DataportenSettings.Enable,
            id: props.config.DataportenSettings.Id,
            secret: props.config.DataportenSettings.Secret,
            userApiEndpoint: props.config.DataportenSettings.UserApiEndpoint,
            authEndpoint: props.config.DataportenSettings.AuthEndpoint,
            tokenEndpoint: props.config.DataportenSettings.TokenEndpoint
        });
    }

    getConfigFromState(config) {
        config.DataportenSettings.Enable = this.state.enable;
        config.DataportenSettings.Id = this.state.id;
        config.DataportenSettings.Secret = this.state.secret;
        config.DataportenSettings.UserApiEndpoint = this.state.userApiEndpoint;
        config.DataportenSettings.AuthEndpoint = this.state.authEndpoint;
        config.DataportenSettings.TokenEndpoint = this.state.tokenEndpoint;

        return config;
    }

    renderTitle() {
        return (
            <h3>
                <FormattedMessage
                    id='admin.authentication.dataporten'
                    defaultMessage='Dataporten'
                />
            </h3>
        );
    }

    renderSettings() {
        return (
            <SettingsGroup>
                <BooleanSetting
                    id='enable'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.enableTitle'
                            defaultMessage='Enable Sign Up With Dataporten: '
                        />
                    }
                    helpText={
                        <div>
                            <FormattedMessage
                                id='admin.dataporten.enableDescription'
                                defaultMessage='When true, Mattermost allows team creation and account signup using Dataporten OAuth.'
                            />
                            <br/>
                            <FormattedHTMLMessage
                                id='admin.dataporten.EnableHtmlDesc'
                                defaultMessage='<ol><li>Log in to your Dataporten account and go to Profile Settings -> Applications.</li><li>Enter Redirect URIs "<your-mattermost-url>/login/dataporten/complete" (example: http://localhost:8065/login/dataporten/complete) and "<your-mattermost-url>/signup/dataporten/complete". </li><li>Then use "Secret" and "Id" fields from Dataporten to complete the options below.</li><li>Complete the Endpoint URLs below. </li></ol>'
                            />
                        </div>
                    }
                    value={this.state.enable}
                    onChange={this.handleChange}
                />
                <TextSetting
                    id='id'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.clientIdTitle'
                            defaultMessage='Id:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.dataporten.clientIdExample', 'Ex "jcuS8PuvcpGhpgHhlcpT1Mx42pnqMxQY"')}
                    helpText={
                        <FormattedMessage
                            id='admin.dataporten.clientIdDescription'
                            defaultMessage='Obtain this value via the instructions above for logging into Dataporten'
                        />
                    }
                    value={this.state.id}
                    onChange={this.handleChange}
                    disabled={!this.state.enable}
                />
                <TextSetting
                    id='secret'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.clientSecretTitle'
                            defaultMessage='Secret:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.dataporten.clientSecretExample', 'Ex "jcuS8PuvcpGhpgHhlcpT1Mx42pnqMxQY"')}
                    helpText={
                        <FormattedMessage
                            id='admin.dataporten.clientSecretDescription'
                            defaultMessage='Obtain this value via the instructions above for logging into Dataporten.'
                        />
                    }
                    value={this.state.secret}
                    onChange={this.handleChange}
                    disabled={!this.state.enable}
                />
                <TextSetting
                    id='userApiEndpoint'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.userTitle'
                            defaultMessage='User API Endpoint:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.dataporten.userExample', 'Ex "https://<your-dataporten-url>/api/v3/user"')}
                    helpText={
                        <FormattedMessage
                            id='admin.dataporten.userDescription'
                            defaultMessage='Enter https://<your-dataporten-url>/api/v3/user.   Make sure you use HTTP or HTTPS in your URL depending on your server configuration.'
                        />
                    }
                    value={this.state.userApiEndpoint}
                    onChange={this.handleChange}
                    disabled={!this.state.enable}
                />
                <TextSetting
                    id='authEndpoint'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.authTitle'
                            defaultMessage='Auth Endpoint:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.dataporten.authExample', 'Ex "https://<your-dataporten-url>/oauth/authorize"')}
                    helpText={
                        <FormattedMessage
                            id='admin.dataporten.authDescription'
                            defaultMessage='Enter https://<your-dataporten-url>/oauth/authorize (example https://example.com:3000/oauth/authorize).   Make sure you use HTTP or HTTPS in your URL depending on your server configuration.'
                        />
                    }
                    value={this.state.authEndpoint}
                    onChange={this.handleChange}
                    disabled={!this.state.enable}
                />
                <TextSetting
                    id='tokenEndpoint'
                    label={
                        <FormattedMessage
                            id='admin.dataporten.tokenTitle'
                            defaultMessage='Token Endpoint:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.dataporten.tokenExample', 'Ex "https://<your-dataporten-url>/oauth/token"')}
                    helpText={
                        <FormattedMessage
                            id='admin.dataporten.tokenDescription'
                            defaultMessage='Enter https://<your-dataporten-url>/oauth/token.   Make sure you use HTTP or HTTPS in your URL depending on your server configuration.'
                        />
                    }
                    value={this.state.tokenEndpoint}
                    onChange={this.handleChange}
                    disabled={!this.state.enable}
                />
            </SettingsGroup>
        );
    }
}
