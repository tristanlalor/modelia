import { ResizeObserver as Polyfill } from '/@juggle/resize-observer/lib/exports/resize-observer.js';

// if ('ResizeObserver' in self) {
//     document.body.innerHTML = "RESIZE OBSERVER SUPPORTED: USING NATIVE";
// } else {
//     document.body.innerHTML = "RESIZE OBSERVER NOT SUPPORTED: USING POLYFILL"; 
// }
let containerQueryListener = () => {
    // Only run if ResizeObserver is supported.
    const ResizeObserver = window.ResizeObserver || Polyfill;
    // if ('ResizeObserver' in self) {
        // Create a single ResizeObserver instance to handle all
        // container elements. The instance is created with a callback,
        // which is invoked as soon as an element is observed as well
        // as any time that element's size changes.
        var ro = new ResizeObserver(function(entries) {
        // Default breakpoints that should apply to all observed
        // elements that don't define their own custom breakpoints.
        var defaultBreakpoints = {SM: 300, SMD: 506, MD: 576, LG: 768, XL: 960};
    
        entries.forEach(function(entry) {
            // If breakpoints are defined on the observed element,
            // use them. Otherwise use the defaults.
            var breakpoints = entry.target.dataset.breakpoints ?
                JSON.parse(entry.target.dataset.breakpoints) :
                defaultBreakpoints;
    
            // Update the matching breakpoints on the observed element.
            Object.keys(breakpoints).forEach(function(breakpoint) {
            var minWidth = breakpoints[breakpoint];
            if (entry.contentRect.width >= minWidth) {
                entry.target.classList.add(breakpoint);
            } else {
                entry.target.classList.remove(breakpoint);
            }
            });
        });
        });
    
        // Find all elements with the `data-observe-resizes` attribute
        // and start observing them.
        var elements = document.querySelectorAll('[data-observe-resizes]');
        for (var element, i = 0; element = elements[i]; i++) {
        ro.observe(element);
        }
    // } else {
    //     console.log("NOT SUPPORTED");
    // }
};
window.containerQueryListener = containerQueryListener;
containerQueryListener();