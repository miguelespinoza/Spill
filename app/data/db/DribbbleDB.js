'use strict';

import realm from './realm';
import {timeStamp} from "../../util/time";

export const DribbbleDB = {
    saveFilters: (filter) => {
        console.log("saving Filter: " + filter);
        realm.write(() => {
            realm.create('FilterItem', {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                name: filter,
                filter_created_at: timeStamp(),
                visible: true
            });
        });
    },

    updateFilter: (filter, newFilter) => {
        realm.write(() => {
            filter.name = newFilter["name"];
            filter.visible = newFilter["visible"];
        });
    },

    getFilters: () => {
        return realm.objects('FilterItem');
    }
};

export default DribbbleDB;