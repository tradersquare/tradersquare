export const ADD_STOCK = "ADD_STOCK";

export default function(stock) {
  console.log('add_stock action: ', stock);

  return {
    type: ADD_STOCK,
    payload: stock
  };
}
