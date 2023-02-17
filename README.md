# LWC Web Speech API Input

https://user-images.githubusercontent.com/5856192/219564855-05dc030b-35ec-4627-99df-fb126bc58108.mov

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
<img width="322" alt="web-speech-api-comp-props" src="https://user-images.githubusercontent.com/5856192/219564805-a83386cf-9013-4e89-95d8-e9cb160664e8.png">


## How to use

Place `c-web-speech-api-input` component where you want with props. `onchangevalue` event returns the value of the input in its `detail` prop.
```
  <c-web-speech-api-input
    min-height="200"
    input-label="Test Input"
    show-toast-on-error="true"
    language={language}
    onchangevalue={handleInputChange}
  ></c-web-speech-api-input>
```

If you want to set up the language flexibly, it can be configured via Apex Picklist. Set the property fetching datasource in your `.js-meta.xml` file.
```
    <property name="language"  type="String" label="Language" datasource="apex://WebSpeechApiPicklist"/>
```

## Considerations
- Transcribe precision depends on Browswer implementations.
  - e.g. [Chrome](https://www.google.com/chrome/privacy/whitepaper.html#speech) sends data to the server.
- [Firefox doesn't support the API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition#browser_compatibility) at the time of writing.

## Disclaimer
This is an experimental demo implementation. It doesn't ensure code integrity. Please confirm the code before you deploy.




