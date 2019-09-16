class CartItem {

    //here there are two type of quantities itemQuantity 
    // itemQuantity is for all Products
   

    constructor(itemName,isSubscribed,subscryptionType,itemQuanity ,itemPrice,sum){
        this.itemName = itemName;
        this.isSubscribed =  isSubscribed;
        this.subscryptionType = subscryptionType;
        this.itemQuanity = itemQuanity;
        this.itemPrice = itemPrice;
        this.sum = sum;
    }
}

export default CartItem;