import { NavigationActions } from 'react-navigation'
import AppContainer from '../Routes/Route';
const initialAction = { type: NavigationActions.Init }
const initialState = AppContainer.router.getStateForAction(initialAction)

export default (state = initialState, action) => {
    let newState = AppContainer.router.getStateForAction(action, state)
  
    if (action.params && action.params.replace) {
      // In order to replace the previous route
      // we'll remove the item at index - 1 and then decrement the index.
      newState.routes.splice(newState.index - 1, 1)
      newState.index--
    }
  
    newState.routes.forEach((route, i) => {
      if (!route.params) route.params = {}
      if (i === newState.index) route.params.active = true
      else route.params.active = false
    })
  
    return newState
  }