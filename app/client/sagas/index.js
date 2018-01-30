import globalsaga from './globalsaga';
import toolsaga from './toolsaga';
import mapsaga from './mapsaga';

// main saga generators
export function* sagas() {
  yield [globalsaga(), mapsaga(), toolsaga()];
}
