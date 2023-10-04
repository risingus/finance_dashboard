

interface ExchangesReducerProps {
  exchanges: []
}

export function exchangesReducer(state: any, action: any) {
  switch (action.type) {

    case 'ADD_EXCHANGE': {
      return {
        ...state,
        exchanges: [
          ...(Array.isArray(state?.exchanges) ? state.exchanges : []),
          action.payload
        ]
      }
    }


    default: {
      return state
    }
  }
}