import {handleActions} from 'redux-actions';
import {types} from './actions';

const defaultState = {
  
  currentViewIndex: 0,
  
  productData: null,
  selectedDesign: null,
  imagesUploaderTrigger: false, // *** to cache bust and reload images after upload
  
  userData: null,
  selectedUser: null,
  
  newUserResponseMessage: null,
  newDesignResponseMessage: null,
  
  autoUserQuery: null,
};

const app = handleActions(
    {
  
      [types.CHANGE_ROUTE](state, {payload}) {
        console.log('/reducers/ -CHANGE_ROUTE', payload);
        return {
          ...state,
          currentViewIndex: payload.index,
        }
      },
      
  
      // *** PRODUCT EDITOR =========
      
      // *** uses saga
      [types.GET_PRODUCT_DATA](state, {payload}) {
        return {
          ...state,
          selectedDesign: null,
        }
      },
  
      // *** uses saga
      [types.PRODUCT_DATA_LOADED](state, {payload}) {
        const productData = payload.response.payload.data;
        return {
          ...state,
          productData,
        }
      },
  
      // *** uses saga
      [types.DB_UPDATE_DESIGN](state, {payload}) {
        return {
          ...state,
        }
      },
   
      // *** uses saga
      [types.DB_UPDATE_DESIGN_RESPONSE](state, {payload}) {
        // *** replace data only on success
        const freshDesignData = (payload.response.payload.success) ?
            payload.response.payload.data : state.selectedDesign;
        
        return {
          ...state,
          selectedDesign: freshDesignData,
        }
      },
  
      [types.DB_UPLOAD_IMAGES](state, {payload}) {
        return {
          ...state,
          imagesUploaderTrigger: true,
        }
      },
  
      [types.DB_UPLOAD_IMAGES_RESPONSE](state, {payload}) {
        return {
          ...state,
          selectedDesign: state.selectedDesign,
          imagesUploaderTrigger: false,
        }
      },
  
      [types.DESIGN_SELECTED](state, {payload}) {
        return {
          ...state,
          selectedDesign: payload.item,
        }
      },
  
  
      // *** uses saga
      [types.DB_DELETE_DESIGN](state, {payload}) {
        return {
          ...state,
        }
      },
  
      // *** uses saga
      // FIXIT some (memory) data persistence evident
      [types.DB_DELETE_DESIGN_RESPONSE](state, {payload}) {
        // console.log('/reducers/ -DB_DELETE_USER_RESPONSE A', state.selectedUser);
        // console.log('/reducers/ -DB_DELETE_USER_RESPONSE B', payload.request.id);
    
        // *** have to update whole data set to ensure latest changes appear
        let productData =[...state.productData];
        let updateIndex = null;
    
        productData.filter((item, index) => {
          if (payload.request.id === state.selectedDesign._id) {
            updateIndex = index;
          }
        });
    
        productData.splice(updateIndex, 1);
        console.log('/reducers/ ->>>>>>>>>>>>> yyyyyy', updateIndex, productData);
        
        return {
          ...state,
          productData,
          selectedDesign: null,
        }
      },
      
      
  
      // *** USER EDITOR =========
      [types.GET_USER_DATA](state, {payload}) {
        console.log('/reducers/ -', payload);
        return {
          ...state,
          selectedUser: null,
        }
      },
  
      [types.USER_DATA_LOADED](state, {payload}) {
        const userData = payload.response.payload.data;
        return {
          ...state,
          userData,
        }
      },
  
      [types.USER_SELECTED](state, {payload}) {
        console.log('/reducers/ -');
        return {
          ...state,
          selectedUser: payload.item,
        }
      },
  
      // *** uses saga
      [types.DB_UPDATE_USER](state, {payload}) {
        return {
          ...state,
        }
      },
  
      // *** uses saga
      [types.DB_UPDATE_USER_RESPONSE](state, {payload}) {
        // console.log('/reducers/ -DB_UPDATE_USER_RESPONSE', payload.response.payload.data._id);
        // *** replace data only on success
        const freshUser = (payload.response.payload.success) ?
            payload.response.payload.data : state.selectedUser;
        
        // *** have to update whole data set to ensure latest changes appear
        const userData =[...state.userData];
        let updateIndex = null;
        
        userData.filter((item, index) => {
          if (payload.response.payload.data._id === item._id) {
            updateIndex = index;
          }
        });
        
        userData[updateIndex] = freshUser;
        
        return {
          ...state,
          userData,
        }
      },
  
  
      // *** uses saga
      [types.DB_CREATE_USER](state, {payload}) {
        return {
          ...state,
        }
      },
  
      // *** uses saga
      [types.DB_CREATE_USER_RESPONSE](state, {payload}) {
        console.log('/reducers/ -DB_CREATE_USER_RESPONSE', payload.response.payload.success);
        
        const autoUserQuery = (payload.response.payload.success) ? payload.response.payload.data.email : null;
        
        return {
          ...state,
          newUserResponseMessage: payload.response.payload.message,
          autoUserQuery,
        }
      },
  
      // *** uses saga
      [types.DB_DELETE_USER](state, {payload}) {
        return {
          ...state,
        }
      },
  
      // *** uses saga
      // FIXIT some (memory) data persistence evident
      [types.DB_DELETE_USER_RESPONSE](state, {payload}) {
        console.log('/reducers/ -DB_DELETE_USER_RESPONSE A', state.selectedUser);
        console.log('/reducers/ -DB_DELETE_USER_RESPONSE B', payload.request.id);
  
        // *** have to update whole data set to ensure latest changes appear
        let userData =[...state.userData];
        let updateIndex = null;
  
        userData.filter((item, index) => {
          if (payload.request.id === state.selectedUser._id) {
            updateIndex = index;
          }
        });
        
        userData.splice(updateIndex, 1);
        console.log('/reducers/ ->>>>>>>>>>>>> xxxxxxx', updateIndex, userData);
        
        
        return {
          ...state,
          userData,
          selectedUser: null,
        }
      },
  
  
  
      // *** uses saga
      [types.DB_CREATE_DESIGN](state, {payload}) {
        return {
          ...state,
        }
      },
  
      // *** uses saga
      [types.DB_CREATE_DESIGN_RESPONSE](state, {payload}) {
        // console.log('/reducers/ -DB_CREATE_USER_RESPONSE', payload.response.payload.message);
        return {
          ...state,
          newDesignResponseMessage: payload.response.payload.message,
        }
      },
      
      
    },
    defaultState
);

export default app;
