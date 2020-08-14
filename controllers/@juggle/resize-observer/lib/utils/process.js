import { hasActiveObservations } from '../algorithms/hasActiveObservations.js';
import { hasSkippedObservations } from '../algorithms/hasSkippedObservations.js';
import { deliverResizeLoopError } from '../algorithms/deliverResizeLoopError.js';
import { broadcastActiveObservations } from '../algorithms/broadcastActiveObservations.js';
import { gatherActiveObservationsAtDepth } from '../algorithms/gatherActiveObservationsAtDepth.js';
var process = function () {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
        depth = broadcastActiveObservations();
        gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
        deliverResizeLoopError();
    }
    return depth > 0;
};
export { process };
