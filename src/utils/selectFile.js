const doNothing = _ => {};
class Trigger {
    constructor() {
        this.listeners = {};
    }

    add(listener) {
        if (!listener)
            return doNothing;
        
        let key = Date.now();
        this.listeners[key] = listener;
        return () => { delete this.listeners[key] };
    }

    trigger(...params) {
        Object.keys(this.listeners)
        .forEach(key => this.listeners[key](...params));
    }
}

const documentFocused = new Trigger();
document.body.onfocus = function() {
    if (documentFocused.shouldTrigger) {
        documentFocused.trigger();
        documentFocused.shouldTrigger = false;
    }
};

let input = document.createElement('input');
input.type = 'file';


export default function selectFile(contentType, multiple) {
    return new Promise(resolve => {
        input.multiple = multiple;
        input.accept = contentType;

        input.onchange = (...params) => {
            let files = Array.from(input.files);
            resolve(multiple ? files : files[0]);
            
            // reset
            input.onchange = undefined;
            input.value = "";
        };

        let removeDocumentListener = documentFocused.add(async _ => {
            removeDocumentListener();

            await new Promise(resolve => setTimeout(resolve, 500)); // there's no other way than to wait some time for the input.onchange to be triggered by the input
            if (input.onchange)
                input.onchange();
        });

        documentFocused.shouldTrigger = true;
        input.click();
    });
}