import{ legacy_createStore as createStore ,applyMiddleware,compose} from 'redux'
import {thunk} from 'redux-thunk'
import {reducres} from '../Reducers/indexReducers'

function saveToLocalStorage(store) {
      try {
            const serializedStore = JSON.stringify(store);
            window.localStorage.setItem('store', serializedStore);
        } catch(e) {
            console.log(e);
        }
}
function loadFromLocalStorage() {
      try{
           const serializedStore=  window.localStorage.setItem('store', serializedStore);
           if(serializedStore === null) return undefined;
           return JSON.parse(serializedStore)
      }catch(e){
            console.log(e)
      }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage(); 

const store = createStore(reducres,persistedState,composeEnhancers(applyMiddleware(thunk)))
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store