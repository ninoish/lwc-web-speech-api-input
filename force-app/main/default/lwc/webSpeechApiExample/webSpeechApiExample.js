import { LightningElement, api } from "lwc";
export default class WebSpeechApiExample extends LightningElement {

    @api language = "en-US";
    value = "";

    handleInputChange(e) {
        this.value = e.detail;
    }
}