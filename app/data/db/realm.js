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

export default new Realm({schema: [FilterItem]});