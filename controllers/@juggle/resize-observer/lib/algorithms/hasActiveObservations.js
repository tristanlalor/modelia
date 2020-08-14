import { resizeObservers } from '../utils/resizeObservers.js';
var hasActiveObservations = function () {
    return resizeObservers.some(function (ro) { return ro.activeTargets.length > 0; });
};
export { hasActiveObservations };
