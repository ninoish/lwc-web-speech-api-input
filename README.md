# LWC Web Speech API Input

An experimental implementation of voice powered input for Lightning Web Component with [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) and [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) Interface, the native browswer Javascript API for free.

## Settings

- [Enable Lightning Web Security](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.security_lwsec_enable)
  - `Settings` => `Session Settings` => check `Use Lightning Web Security for Lightning web components` and save the settings.

- Allow to use [microphone](https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop) on your browswer.

## Properties
- Language
- Min textarea height
- Show toast notification on error
- Textarea Label

## Considerations
- Transcribe precision depends on Browswer implementations.
  - e.g. [Chrome](https://www.google.com/chrome/privacy/whitepaper.html#speech) sends data to the server.
- [Firefox doesn't support the API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility) at the time of writing.

## Disclaimer
This is an experimental demo implementation. It doesn't ensure code integrity. Please confirm the code before you deploy.