
export const SEND_TICKER = 'SEND_TICKER';

export default function (ticker) {

  return {
    type: SEND_TICKER,
    payload: ticker
  };
}
