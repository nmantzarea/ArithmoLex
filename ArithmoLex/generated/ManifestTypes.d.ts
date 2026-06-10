/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    value: ComponentFramework.PropertyTypes.NumberProperty;
    currencyCode: ComponentFramework.PropertyTypes.StringProperty;
    defaultLanguage: ComponentFramework.PropertyTypes.StringProperty;
    capitalize: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    wordsOutput: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    value?: number;
    wordsOutput?: string;
}
