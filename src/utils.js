/**
 this is a copy of a few of the helper functions in the servers pos domain, it should really be put into a seperate module and used both in the client and server.
 * */

import {List, Map} from 'immutable';

export const utils = {
  getIndex: (list, id) => {
    id = parseInt(id);
    return list.findIndex(
        val => {
        return val.get('_id') == id;
      }
    );
  },
  getItem : (state, listName, id) => {
    let list = state.get(listName);
    if(list == null){
      return;
    }
    id = parseInt(id);
    let i = utils.getIndex(list, id);
    return list.get(i);
  },
  filterList : (state, listName, fkName, fkId) =>{
    if(state != null && listName != null && fkName != null ) {
      fkId = parseInt(fkId);
      // get comments for post
      let list = state.get(listName);
      if(list == null){
        return List.of();
      }
      list = list.filter((item) => {
        return item.get(fkName) == fkId;
      });
      console.log('filteredList fkId:' + fkId +', '+ JSON.stringify(list, null, 2));

      return list;
    } else {
      return List.of();
    }
  }
};