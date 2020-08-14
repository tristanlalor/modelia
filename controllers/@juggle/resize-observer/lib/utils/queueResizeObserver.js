import { queueMicroTask } from './queueMicroTask.js';
var queueResizeObserver = function (cb) {
    queueMicroTask(function ResizeObserver() {
        requestAnimationFrame(cb);
    });
};
export { queueResizeObserver };
