import { DOMWidgetView } from "@jupyter-widgets/base";
import { vueRender, createViewContext } from "jupyter-vue";
import vuetify from "./plugins/nodepsVuetify";

export class VuetifyView extends DOMWidgetView {
    remove() {
        if(this.vueApp) {
            this.vueApp.$destroy();
        }
        return super.remove();
    }

    render() {
        super.render();
        this.displayed.then(() => {
            const vueEl = document.createElement('div');
            this.el.appendChild(vueEl);
            const view = this;

            this.vueApp = new Vue({
                vuetify,
                el: vueEl,
                provide: {
                    viewCtx: createViewContext(this),
                },
                render(createElement) {
                    return view.vueRender(createElement);
                },
            });
        });
    }

    vueRender(createElement) {
        return createElement({
          provide: {
            viewCtx: createViewContext(this),
          },
          render: () => {
            return vueRender(createElement, this.model, this);
          },
        });
    }
}
