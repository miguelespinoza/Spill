'use strict';

import Realm from 'realm';

class FilterItem {}
FilterItem.schema = {
    name: 'FilterItem',
    properties: {
        id: 'string',
        name: 'string',
        filter_created_at: 'string',
        visible: 'bool'
    },
};

class Account {}
Account.schema = {
    name: 'Account',
    properties: {
        id: 'string',
        name: 'string',
        dribbble_access_token: 'string',
        dribbble_token_type: 'string',
        dribbble_token_created_at: 'string',
        dribbble_scope: 'string',
        dribbble_avatar_url: 'string'
    }
};

export default new Realm({schema: [FilterItem, Account]});