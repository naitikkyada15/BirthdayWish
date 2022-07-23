import * as React from 'react';
import styles from './Speech.module.scss';
import { ISpeechProps } from './ISpeechProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MicRecorder from 'mic-recorder-to-mp3';
import { Items, sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
import Record from './Record';
import { PrimaryButton } from 'office-ui-fabric-react';
import { SPComponentLoader } from '@microsoft/sp-loader';
import Tabel from './Tabel';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export interface ISpeecState {
  isRecording: any;
  blobURL: any;
  isBlocked: any;
  ishidden: Boolean;
  Document: any;
}

const audittaskTableColumns = [
  {
    text: "Number",
    dataField: 'Number',
    sort: true
  },
  {
    text: 'File Name',
    dataField: 'FileName',
    sort: true
  },

];

const Documenttabel = [
  {
    "Number": "Test User",
    "FileName": "Street 235 Paradise tower, S.G Highway Ahmedabad",
  },

];

export default class Speech extends React.Component<ISpeechProps, ISpeecState> {

  public constructor(props: ISpeechProps) {
    super(props);
    sp.setup({ spfxContext: this.props.spfxContext });
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
      ishidden: true,
      Document: []
    };
  }


  public render(): React.ReactElement<ISpeechProps> {
    return (
      <div>
        <PrimaryButton onClick={() => { this.setState({ ishidden: false }); }} text="Record Message" />
        <Record spfxContext={this.props.spfxContext} ishidden={this.state.ishidden} onDismiss={this.DismissPopup} SiteURL={this.props.SiteURL}></Record>
        <div>

          <Tabel keyField={"TaskID"} TableDataAndColumns={{ columns: audittaskTableColumns, rows: this.state.Document }} />
        </div>
      </div>
    );
  }

  public componentDidMount = () => {
    this.getDocuments();
  }

  public getDocuments = async () => {
    let allDocs = [];
    await sp.web.lists.getByTitle('Audio').items.select('Id,FileRef').get().then((data) => {
      data.forEach((val, i) => {
        let currentDocument = {};
        currentDocument['Number'] = i + 1;
        let name = val.FileRef.split('Audio/')[1].split('.')[0];
        currentDocument['FileName'] = <a style={{ color: "blue" }} href={val.FileRef}>{name}</a>;
        // currentDocument['URL'] = val.FileRef;
        allDocs.push(currentDocument);
      })

      this.setState({ Document: allDocs });
    }).catch((e) => {
      console.log(e);
    })
  }

  public DismissPopup = () => {
    this.setState({ ishidden: true });
    this.getDocuments();
  }

}
