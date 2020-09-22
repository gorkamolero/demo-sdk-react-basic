class Utils {
     haveSameElements(l1, l2){
        if (l1.length!==l2.length) return false;

        for (let el of l2) {
            if (l1.indexOf(el)===-1) return false
        }

        return true;
    }

    isEmpty(obj) {
         if (obj === null ) {
             return true
         } else if (Array.isArray(obj)) {
             return obj.length===0;
         } else if (typeof obj === 'object') {
             return Object.keys(obj).length===0;
         } else if (typeof obj === 'string') {
             return obj==='';
         } else {
             throw new Error("Invalid object");
         }
    }

    waitForEngine=function(callback) {
        let waited=0;
        let timeout = 3;

        let Engine = window.pickzen.Engine;

        if (Engine) {
            callback(Engine.default);
        } else {
            function wait(interval) {
                setTimeout(function () {
                    waited += interval;

                    Engine = window.pickzen.Engine;
                    if (Engine && Engine.default) {
                        // Modulo Engine cargado por webpack
                        Engine = Engine.default;
                    }
                    if (Engine !== undefined) {
                        callback(Engine)
                    } else if (waited >= timeout * 1000) {
                        callback(null);
                    } else {
                        wait(interval * 2);
                    }
                }, interval);
            }

            wait(30);
        }
    };

    getMultiOptions(optionsAsString) {
        const options = optionsAsString.split(';\n')
            .map(
                (opt) => opt.split(';')
            ).map(
                ([value, id]) => ({ id, value })
            )

        return options
    }

}

export default new Utils()