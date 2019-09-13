class CartItem {

    //here there are two type of quantities itemQuantity and subscribedQuantity
    // itemQuantity is for getOnce Products
    // subscribedQuantity is for Subscried Products 
    // using boolean value isSubscribed calutating the Sum of products ,


    // Similar things doing reducer for calculation 

    constructor(itemName,isSubscribed,subscryptionType,itemQuanity ,itemPrice,sum){
        this.itemName = itemName;
        this.isSubscribed =  isSubscribed;
        this.subscryptionType = subscryptionType;
        this.subscribedQuantity = subscribedQuantity;
        this.itemQuanity = itemQuanity;
        this.itemPrice = itemPrice;
        this.sum = sum;
    }
}

export default CartItem;