import { resizeObservers } from '../utils/resizeObservers.js';
var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
};
export { hasSkippedObservations };
