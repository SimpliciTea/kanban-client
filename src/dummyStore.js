

const store = {
  boards: {
    byId: {
      0: {
        id: 0,
        title: 'board 0',
        columns: {
          // not sure that columns should be byId/allId pattern? rolling with it for now, for consistency
          byId: {
            0: {
              id: 0,
              itemsById: [0,1,2]
            },
            1: {
              id: 1,
              itemsById: [3,4]
            },
            2: {
              id: 2,
              itemsById: [5]
            }
          },
          allIds: [0,1,2]
        },
        items: {
          byId: {
            0: {
              id: 0,
              text: 'item 0'
            },
            1: {
              id: 1,
              text: 'item 1'
            },
            2: {
              id: 2,
              text: 'item 2'
            },
            3: {
              id: 3,
              text: 'item 3'
            },
            4: {
              id: 4,
              text: 'item 4'
            },
            5: {
              id: 5,
              text: 'item 5'
            }
          },
          allIds: [0,1,2,3,4,5]
        }
      }
    },
    allIds: [0]
  }  
}



export default store;
