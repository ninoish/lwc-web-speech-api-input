import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class WebSpeechApiInput extends LightningElement {
  @api minHeight;
  @api showToastOnError;
  @api language;
  @api inputLabel;
  @api endcallback;
  @track recognition;
  @track transcript = "";

  hasSpeechRecognitionApi = false;
  recognizing = false;
  ignoreOnEnd = false;
  textareaValue = "";
  startTimestamp;

  connectedCallback() {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      this.showError("Web Speech Api is not supported");
      return;
    }
    this.hasSpeechRecognitionApi = true;
    this.recognition =
      "webkitSpeechRecognition" in window
        ? // eslint-disable-next-line no-undef
          new webkitSpeechRecognition()
        : // eslint-disable-next-line no-undef
          new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      console.log("onstart");
      this.recognizing = true;
      this.textareaValue = this.transcript;
    };

    this.recognition.onerror = (event) => {
      console.log("onerror", event);
      this.ignoreOnEnd = true;

      switch (event.error) {
        case "no-speech":
          this.showError(
            "[Error] No speech detected",
            "Time out. Please try again."
          );
          break;
        case "audio-capture":
          this.showError(
            "[Error] Audio capture",
            "Please enable audio capture permission"
          );
          break;
        case "not-allowed":
          if (event.timeStamp - this.startTimestamp < 100) {
            // blocked
            this.showError(
              "[Error] Speech Recognition Blocked",
              "Please enable audio capture permission"
            );
          } else {
            // denied
            this.showError(
              "[Error] Speech Recognition Denied",
              "Please enable audio capture permission"
            );
          }
          break;
        default:
          this.showError("[Error] Unknown", event.error);
          break;
      }
    };

    this.recognition.onend = () => {
      console.log("onend");
      this.recognizing = false;
      if (this.ignoreOnEnd) {
        return;
      }
      if (this.endcallback && typeof this.endcallback === "function") {
        this.endcallback();
      }
    };

    this.recognition.onresult = (event) => {
      console.log("onresult", event);
      if (typeof event.results === "undefined") {
        this.recognition.onend = null;
        this.recognition.stop();
        return;
      }
      this.transcript = this.textareaValue;
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          this.transcript += event.results[i][0].transcript + "\n";
        } else {
          this.transcript += event.results[i][0].transcript;
        }
      }
      this.transcript = this.capitalize(this.transcript);

      this.emitTranscript();
    };
  }

  emitTranscript() {
    this.template.querySelector("textarea").value = this.transcript;
    this.dispatchEvent(
      new CustomEvent("changevalue", {
        detail: this.transcript
      })
    );
  }

  handleTextAreaChange(e) {
    this.transcript = e.currentTarget.value;
    this.emitTranscript();
  }

  startRecognition(event) {
    console.log("startRecognition", event.timeStamp);
    if (this.recognizing) {
      this.recognition.stop();
      return;
    }
    this.recognition.lang = this.language ?? "en-US";
    this.recognition.start();
    this.ignoreOnEnd = false;
    this.startTimestamp = event.timeStamp;
  }

  FIRST_CHAR = /\S/;
  capitalize(s) {
    return s.replace(this.FIRST_CHAR, function (m) {
      return m.toUpperCase();
    });
  }

  get textareaStyle() {
    if (this.minHeight && parseInt(this.minHeight, 10) > 0) {
      return `min-height: ${parseInt(this.minHeight, 10)}px`;
    }
    return "";
  }

  get contentTranslation() {
    switch (this.language) {
      case "ja-JP":
        return {
          recognizing: "音声入力中...",
          startSpeech: "スピーチ開始",
          stopSpeech: "スピーチ停止"
        };

      default:
        return {
          recognizing: "Speech Input Activated",
          startSpeech: "Start Speech",
          stopSpeech: "Stop Speech"
        };
    }
  }

  showError(title, message) {
    if (this.showToastOnError) {
      this.dispatchEvent(
        new ShowToastEvent({
          title,
          message,
          variant: "error"
        })
      );
    } else {
      console.error(title, message);
    }
  }
}
