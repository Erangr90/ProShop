export const productListReducer = (state= {products:[]}, action)=>{

    switch (action.type) {
        case '1':
            return {loading:true, products:[]}
        case '2':
            return {loading:false, products:action.payload}
        case '3':
            return {loading:false, error:action.payload}
        default:
            return {products:[]}
    }

}