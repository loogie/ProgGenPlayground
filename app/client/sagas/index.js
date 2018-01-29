import mysagas from './mysaga';
// main saga generators
export function* sagas() {
  yield [mysagas()];
}
