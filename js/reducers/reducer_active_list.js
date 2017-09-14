import { ADD_ITEM, DELETE_ITEM, DELETE_LIST, LOAD_ACTIVE_ITEMS, LOAD_LISTS, SET_ACTIVE_LIST, UPDATE_ITEM_CHECKED } from '../actions/index'

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case SET_ACTIVE_LIST:
        state = { list: action.payload, items: [], deleted: false };
        break;
      case LOAD_ACTIVE_ITEMS:
        if (state && state.list) {
          state = { list: state.list, items: action.payload, deleted: false };
        }
        break;
      case ADD_ITEM:
        if (state && state.list && state.list._id == action.payload.list) {
          let newItems = Array.from(state.items);
          newItems.push(action.payload);
          state = { list: state.list, items: newItems, deleted: false };
        }
        break;
      case UPDATE_ITEM_CHECKED:
        if (state && state.list && state.list._id == action.payload.list) {
          let index = -1;
          for (let i = state.items.length - 1; i >= 0; i--) {
            if (state.items[i]._id == action.payload._id) {
              index = i;
              break;
            }
          }
          let newItems = Array.from(state.items);
          if (index != -1) {
            newItems.splice(index, 1, action.payload);
          }
          state = { list: state.list, items: newItems, deleted: false };
        }
        break;
      case DELETE_ITEM:
        if (state && state.list && state.list._id == action.payload.list) {
          let index = -1;
          for (let i = state.items.length - 1; i >= 0; i--) {
            if (state.items[i]._id == action.payload._id) {
              index = i;
              break;
            }
          }
          if (index != -1) {
            state.items.splice(index, 1);
            let newItems = Array.from(state.items);
            state = { list: state.list, items: newItems, deleted: false };
          }
        }
        break;
      case LOAD_LISTS:
        if (state && state.list) {
          let listFound = false;
          for (let listMeta of action.payload) {
            if (listMeta.list._id == state.list._id) {
              listFound = true;
              state = { list: listMeta.list, items: listMeta.items, deleted: false };
              break;
            }
          }
          if (! listFound) {
            state = { list: state.list, items: state.items, deleted: true };
          }
        }
        break;
      case DELETE_LIST:
        // todo - this will never get called because of where it's triggered
        if (state && state.list) {
          let index = -1;
          for (let i = state.length - 1; i >= 0; i--) {
            if (state[i].list._id == action.payload._id) {
              index = i;
              break;
            }
          }
          if (index != -1) {
            state = { list: state.list, items: state.items, deleted: true };
          }
        }
        break;
    }
  }
  return state;
}