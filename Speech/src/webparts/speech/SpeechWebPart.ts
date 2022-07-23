import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpeechWebPartStrings';
import Speech from './components/Speech';
import { ISpeechProps } from './components/ISpeechProps';

export interface ISpeechWebPartProps {
  description: string;
}

export default class SpeechWebPart extends BaseClientSideWebPart<ISpeechWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpeechProps> = React.createElement(
      Speech,
      {
        description: this.properties.description,
        spfxContext: this.context,
        SiteURL: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
