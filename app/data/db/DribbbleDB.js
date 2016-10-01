'use strict';

import realm from './realm';
import {timeStamp} from "../../util/time";

export const DribbbleDB = {
    saveFilters (filter) {
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

    updateFilter(filter, newFilter) {
        realm.write(() => {
            filter.name = newFilter["name"];
            filter.visible = newFilter["visible"];
        });
    },

    getFilters() {
        return realm.objects('FilterItem');
    },

    saveDribbbleAccount(account) {
        console.log("saveDribbleAccount", account);
        realm.write(() => {
            realm.create('Account', {
                id: account["id"].toString(),
                name: account["name"],
                dribbble_access_token: account["access_token"],
                dribbble_token_type: account["token_type"],
                dribbble_token_created_at: account["created_at"].toString(),
                dribbble_scope: account["scope"],
                dribbble_avatar_url: account["avatar_url"]
            });
        });
    }
};

export default DribbbleDB;